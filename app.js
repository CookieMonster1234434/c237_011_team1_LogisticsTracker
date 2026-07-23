// =====================================================================
// SHAKIR - Updating / Editing information
// =====================================================================

// Show the Edit form with the current values already filled in
app.get('/admin/equipment/:id/edit', checkAuthenticated, checkAdmin, (req, res) => {
    const equipmentId = req.params.id;
    const sql = 'SELECT * FROM equipment WHERE equipment_id = ?';

    db.query(sql, [equipmentId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving equipment.');
        }

        if (results.length === 0) {
            return res.send('Equipment not found');
        }

        res.render('admin/edit-equipment', {
            pageTitle: 'Edit Equipment',
            user: req.session.user,
            equipment: results[0],
            error: req.flash('error')[0],
            success: req.flash('success')[0]
        });
    });
});

// Save the edited values back into the database
app.post('/admin/equipment/:id/edit', checkAuthenticated, checkAdmin, upload.single('image'), (req, res) => {
    const equipmentId = req.params.id;
    const { name, category, description, total_quantity } = req.body;
    const itemCondition = req.body.condition;

    // Find out how many units are currently out on loan.
    // We must not lose track of them when the total quantity changes.
    const onLoanSql = `SELECT COUNT(*) AS onLoan FROM loans
                       WHERE equipment_id = ? AND status = 'borrowed'`;

    db.query(onLoanSql, [equipmentId], (error, loanResults) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error checking loans');
        }

        const onLoan = loanResults[0].onLoan;

        if (total_quantity < onLoan) {
            req.flash('error', 'Total quantity cannot be less than the ' + onLoan + ' currently on loan.');
            return res.redirect('/admin/equipment/' + equipmentId + '/edit');
        }

        // New available = new total - however many are still out
        const newAvailable = total_quantity - onLoan;

        // Keep the old photo unless a new one was uploaded
        const findSql = 'SELECT image FROM equipment WHERE equipment_id = ?';
        db.query(findSql, [equipmentId], (error, imageResults) => {
            if (error) {
                console.error('Database query error:', error.message);
                return res.send('Error retrieving equipment');
            }

            let image = imageResults[0].image;
            if (req.file) {
                image = req.file.filename;
            }

            const sql = `UPDATE equipment
                         SET name = ?, category = ?, description = ?, image = ?,
                             total_quantity = ?, available_quantity = ?, \`condition\` = ?
                         WHERE equipment_id = ?`;

            db.query(sql, [name, category, description, image, total_quantity, newAvailable, itemCondition, equipmentId],
                (error, results) => {
                    if (error) {
                        console.error('Error updating equipment:', error.message);
                        return res.send('Error updating equipment');
                    }
                    req.flash('success', name + ' has been updated.');
                    res.redirect('/equipment/' + equipmentId);
                });
        });
    });
});

// A student returns an item - this UPDATES the existing loan record
app.post('/myloans/:id/return', checkAuthenticated, (req, res) => {
    const loanId = req.params.id;
    const userId = req.session.user.user_id;

    // Find the loan first. Checking user_id as well stops a student
    // from returning somebody else's loan by editing the URL.
    const findSql = `SELECT * FROM loans
                     WHERE loan_id = ? AND user_id = ? AND status = 'borrowed'`;

    db.query(findSql, [loanId, userId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving loan');
        }

        if (results.length === 0) {
            req.flash('error', 'Loan record not found.');
            return res.redirect('/myloans');
        }

        const loan = results[0];

        const updateLoanSql = `UPDATE loans SET return_date = CURDATE(), status = 'returned'
                               WHERE loan_id = ?`;

        db.query(updateLoanSql, [loanId], (error, results) => {
            if (error) {
                console.error('Error updating loan:', error.message);
                return res.send('Error returning equipment');
            }

            // Put the unit back into the inventory
            const restockSql = `UPDATE equipment SET available_quantity = available_quantity + 1
                                WHERE equipment_id = ?`;

            db.query(restockSql, [loan.equipment_id], (error, results) => {
                if (error) {
                    console.error('Error updating stock:', error.message);
                    return res.send('Error updating stock');
                }
                req.flash('success', 'Item returned. Thank you!');
                res.redirect('/myloans');
            });
        });
    });
});

// Admin force-return: mark a still-borrowed loan as returned and restock it.
// Same idea as the student return above, but done by an admin from the
// All Loans page - useful when a student forgets to return an item.
app.post('/admin/loans/:id/return', checkAuthenticated, checkAdmin, (req, res) => {
    const loanId = req.params.id;

    // Look up the loan first so we know which equipment to put back into stock.
    // We only allow this on loans that are still 'borrowed'.
    const findSql = `SELECT * FROM loans WHERE loan_id = ? AND status = 'borrowed'`;
    db.query(findSql, [loanId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving loan');
        }

        if (results.length === 0) {
            req.flash('error', 'That loan is not currently borrowed.');
            return res.redirect('/admin/loans');
        }

        const loan = results[0];

        const updateLoanSql = `UPDATE loans SET return_date = CURDATE(), status = 'returned'
                               WHERE loan_id = ?`;
        db.query(updateLoanSql, [loanId], (error, results) => {
            if (error) {
                console.error('Error updating loan:', error.message);
                return res.send('Error returning equipment');
            }

            // Put the unit back into the inventory
            const restockSql = `UPDATE equipment SET available_quantity = available_quantity + 1
                                WHERE equipment_id = ?`;
            db.query(restockSql, [loan.equipment_id], (error, results) => {
                if (error) {
                    console.error('Error updating stock:', error.message);
                    return res.send('Error updating stock');
                }
                req.flash('success', 'Loan marked as returned by admin.');
                res.redirect('/admin/loans');
            });
        });
    });
});
