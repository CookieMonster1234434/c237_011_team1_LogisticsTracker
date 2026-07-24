// =====================================================================
// C237 CA2 - CCA Logistics Tracker (c237_011 Team 1)
// HONG WEI (25047719) - Removing Information
// =====================================================================
// This branch contains only Hong Wei's own routes: removing equipment,
// loans and users. These are merged into the shared app.js on main,
// where the database connection, middleware (checkAuthenticated /
// checkAdmin) and the other members' features live.
// =====================================================================


// Delete an equipment item (admin only).
// We cannot run DELETE straight away because the loans table has a
// foreign key pointing at equipment - MySQL will reject the delete.
app.post('/admin/equipment/:id/delete', checkAuthenticated, checkAdmin, (req, res) => {
    const equipmentId = req.params.id;

    // Step 1 - refuse to delete anything that is still out on loan
    const activeSql = `SELECT COUNT(*) AS activeLoans FROM loans
                       WHERE equipment_id = ? AND status = 'borrowed'`;

    db.query(activeSql, [equipmentId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error checking loans');
        }

        if (results[0].activeLoans > 0) {
            // Show the admin exactly how many units are still out
            req.flash('error', 'Cannot delete: this item is still on loan to ' + results[0].activeLoans + ' student(s).');
            return res.redirect('/equipment/' + equipmentId);
        }

        // Step 2 - remove the old (returned) loan history first,
        // otherwise the foreign key blocks the delete
        const historySql = 'DELETE FROM loans WHERE equipment_id = ?';
        db.query(historySql, [equipmentId], (error, results) => {
            if (error) {
                console.error('Error deleting loan history:', error.message);
                return res.send('Error deleting equipment');
            }

            // Step 3 - now the equipment row can be deleted
            const sql = 'DELETE FROM equipment WHERE equipment_id = ?';
            db.query(sql, [equipmentId], (error, results) => {
                if (error) {
                    console.error('Error deleting equipment:', error.message);
                    return res.send('Error deleting equipment');
                }
                req.flash('success', 'Equipment deleted from the inventory.');
                res.redirect('/equipment');
            });
        });
    });
});

// Admin deletes a single loan record from the All Loans page.
// If the loan is still 'borrowed', we put the unit back into stock first,
// otherwise that unit would be lost from the available count.
app.post('/admin/loans/:id/delete', checkAuthenticated, checkAdmin, (req, res) => {
    const loanId = req.params.id;

    // Find the loan first so we know its equipment and whether it is still out.
    const findSql = 'SELECT * FROM loans WHERE loan_id = ?';
    db.query(findSql, [loanId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving loan');
        }

        if (results.length === 0) {
            req.flash('error', 'Loan record not found.');
            return res.redirect('/admin/loans');
        }

        const loan = results[0];

        if (loan.status === 'borrowed') {
            // Item is still out on loan - restock one unit, then delete the record
            const restockSql = `UPDATE equipment SET available_quantity = available_quantity + 1
                                WHERE equipment_id = ?`;
            db.query(restockSql, [loan.equipment_id], (error, results) => {
                if (error) {
                    console.error('Error updating stock:', error.message);
                    return res.send('Error updating stock');
                }

                const deleteSql = 'DELETE FROM loans WHERE loan_id = ?';
                db.query(deleteSql, [loanId], (error, results) => {
                    if (error) {
                        console.error('Error deleting loan:', error.message);
                        return res.send('Error deleting loan');
                    }
                    req.flash('success', 'Loan record deleted (item returned to stock).');
                    res.redirect('/admin/loans');
                });
            });
        } else {
            // Loan already returned - just delete the record
            const deleteSql = 'DELETE FROM loans WHERE loan_id = ?';
            db.query(deleteSql, [loanId], (error, results) => {
                if (error) {
                    console.error('Error deleting loan:', error.message);
                    return res.send('Error deleting loan');
                }
                req.flash('success', 'Loan record deleted.');
                res.redirect('/admin/loans');
            });
        }
    });
});

// Admin clears the whole returned-loan history in one go, to tidy the table.
// This only removes loans that are already 'returned', so nothing that is
// still on loan is affected.
app.post('/admin/loans/clear-returned', checkAuthenticated, checkAdmin, (req, res) => {
    // First count how many returned loans there are, so we can report the number
    const countSql = `SELECT COUNT(*) AS returnedCount FROM loans WHERE status = 'returned'`;
    db.query(countSql, (error, countResults) => {
        if (error) {
            console.error('Error counting loan history:', error.message);
            return res.send('Error clearing loan history');
        }

        const returnedCount = countResults[0].returnedCount;

        // Then delete all the returned loans
        const deleteSql = `DELETE FROM loans WHERE status = 'returned'`;
        db.query(deleteSql, (error, results) => {
            if (error) {
                console.error('Error clearing loan history:', error.message);
                return res.send('Error clearing loan history');
            }
            req.flash('success', returnedCount + ' returned loan record(s) cleared.');
            res.redirect('/admin/loans');
        });
    });
});

// Show the Manage Users page (admin only) - the screen used to remove users.
app.get('/admin/users', checkAuthenticated, checkAdmin, (req, res) => {
    const sql = 'SELECT user_id, username, email, role FROM users ORDER BY user_id ASC';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving users');
        }
        res.render('admin/users', {
            pageTitle: 'Manage Users',
            user: req.session.user,
            users: results,
            error: req.flash('error')[0],
            success: req.flash('success')[0]
        });
    });
});

// Delete a user account (admin only).
// Same foreign-key problem as deleting equipment: the loans table points at
// users, so we cannot delete a user while their loans still exist.
app.post('/admin/users/:id/delete', checkAuthenticated, checkAdmin, (req, res) => {
    const userId = req.params.id;

    // Safety - an admin must not delete their own account (it would log them out
    // mid-action and leave the session pointing at a user that no longer exists).
    // parseInt turns the URL text id into a number so we can compare it.
    if (parseInt(userId) === req.session.user.user_id) {
        req.flash('error', 'You cannot delete your own account.');
        return res.redirect('/admin/users');
    }

    // Step 1 - refuse if this user still has items out on loan
    const activeSql = `SELECT COUNT(*) AS activeLoans FROM loans
                       WHERE user_id = ? AND status = 'borrowed'`;
    db.query(activeSql, [userId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error checking loans');
        }

        if (results[0].activeLoans > 0) {
            req.flash('error', 'Cannot delete: this user still has ' + results[0].activeLoans + ' item(s) on loan.');
            return res.redirect('/admin/users');
        }

        // Step 2 - remove their loan history first,
        // otherwise the foreign key blocks the delete
        const historySql = 'DELETE FROM loans WHERE user_id = ?';
        db.query(historySql, [userId], (error, results) => {
            if (error) {
                console.error('Error deleting loan history:', error.message);
                return res.send('Error deleting user');
            }

            // Step 3 - now the user row can be deleted
            const deleteSql = 'DELETE FROM users WHERE user_id = ?';
            db.query(deleteSql, [userId], (error, results) => {
                if (error) {
                    console.error('Error deleting user:', error.message);
                    return res.send('Error deleting user');
                }
                req.flash('success', 'User account deleted.');
                res.redirect('/admin/users');
            });
        });
    });
});

