// =====================================================================
// C237 CA2 - Logistics Tracker (c237_011 Team 1)
// =====================================================================
// app.js is shared by the whole team.
// Each member owns the section marked with their name below.
//
//   Joshua   - Registration, Login, Logout, Access Control
//   Jerald   - Creating / Adding information
//   Max      - Viewing / Displaying information
//   Shakir   - Updating / Editing information
//   Hong Wei - Removing information
//   Joel     - Search & Filter, MySQL connection
// =====================================================================

const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');

const app = express();


// =====================================================================
// JOEL - MySQL database connection
// =====================================================================
const db = mysql.createConnection({
    host: 'c237-asyraf-mysql.mysql.database.azure.com',
    user: 'c237_011',
    password: 'c237011@2026!',                      // change to your own MySQL password
    database: 'c237_011_team1_logisticstracker',
    dateStrings: true,                              // return DATE columns as 'YYYY-MM-DD' text
    ssl: { rejectUnauthorized: false }              // Azure MySQL only accepts encrypted (SSL) connections
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL database');
});


// =====================================================================
// APP SET UP (whole team)
// =====================================================================
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'c237logisticssecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }     // session lasts 1 week
}));

app.use(flash());

// multer saves uploaded photos into public/uploads,
// so the views can show them with <img src="/uploads/filename">
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


// =====================================================================
// SHARED HELPER FUNCTIONS (whole team)
// =====================================================================

// Returns today's date as 'YYYY-MM-DD' so it can be compared with due_date
const getToday = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
};

// ENHANCEMENT: the database only stores 'borrowed' or 'returned'.
// A loan is OVERDUE when it is still borrowed and the due date has passed.
// We work this out in JavaScript so it is always correct on the day it is viewed.
const markOverdue = (loans) => {
    const today = getToday();
    for (let i = 0; i < loans.length; i++) {
        if (loans[i].status === 'borrowed' && loans[i].due_date < today) {
            loans[i].status = 'overdue';
        }
    }
    return loans;
};


// =====================================================================
// JOSHUA - Access Control (middleware)
// =====================================================================

// Stops anyone who is not logged in
const checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'Please log in to view this resource');
        res.redirect('/login');
    }
};

// Stops anyone who is logged in but is NOT an admin
const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        req.flash('error', 'Access denied. Admin only.');
        res.redirect('/equipment');
    }
};

// Server-side validation for the registration form
const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/register');
    }

    if (password.length < 6) {
        req.flash('error', 'Password should be at least 6 or more characters long');
        return res.redirect('/register');
    }

    next();
};


// =====================================================================
// JOSHUA - Registration, Login and Logout routes
// =====================================================================

app.get('/register', (req, res) => {
    res.render('register', {
        pageTitle: 'Register',
        user: req.session.user,
        error: req.flash('error')[0],
        success: req.flash('success')[0]
    });
});

app.post('/register', validateRegistration, (req, res) => {
    const { username, email, password } = req.body;

    // Check the email has not already been used
    const checkSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkSql, [email], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error registering user');
        }

        if (results.length > 0) {
            req.flash('error', 'This email is already registered.');
            return res.redirect('/register');
        }

        // SHA1() hashes the password so the real password is never stored.
        // New accounts are always 'student' - admin accounts are created by
        // the logistics teacher directly in the database.
        const sql = `INSERT INTO users (username, email, password, role)
                     VALUES (?, ?, SHA1(?), 'student')`;

        db.query(sql, [username, email, password], (error, results) => {
            if (error) {
                console.error('Error registering user:', error.message);
                return res.send('Error registering user');
            }
            req.flash('success', 'Registration successful! Please log in.');
            res.redirect('/login');
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        pageTitle: 'Login',
        user: req.session.user,
        error: req.flash('error')[0],
        success: req.flash('success')[0]
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/login');
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = SHA1(?)';
    db.query(sql, [email, password], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error logging in');
        }

        if (results.length > 0) {
            // Store the user in the session so the server remembers them
            req.session.user = results[0];
            req.flash('success', 'Welcome back, ' + results[0].username + '!');

            // Send each role to a different landing page
            if (results[0].role === 'admin') {
                res.redirect('/admin/loans');
            } else {
                res.redirect('/equipment');
            }
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    });
});

// The navbar logout button submits a POST form
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});


// =====================================================================
// MAX - Viewing / Displaying information
// =====================================================================

app.get('/', (req, res) => {
    res.redirect('/equipment');
});

// ---- JOEL owns the search / filter logic inside this route ----
app.get('/equipment', (req, res) => {
    // Read what the user typed / selected in the filter bar
    const search = req.query.search || '';
    const category = req.query.category || '';

    // Build the SQL step by step depending on what the user chose.
    // Using ? placeholders keeps the query safe from SQL injection.
    let sql = 'SELECT * FROM equipment WHERE name LIKE ?';
    let params = ['%' + search + '%'];

    if (category !== '') {
        sql += ' AND category = ?';
        params.push(category);
    }

    sql += ' ORDER BY name ASC';

    db.query(sql, params, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving equipment');
        }

        // Second query builds the dropdown from the database,
        // so new categories appear automatically (nothing is hardcoded)
        const catSql = 'SELECT DISTINCT category FROM equipment ORDER BY category ASC';
        db.query(catSql, (error, catResults) => {
            if (error) {
                console.error('Database query error:', error.message);
                return res.send('Error retrieving categories');
            }

            // The view expects a plain list of names, e.g. ['Camera', 'Laptop']
            const categories = [];
            for (let i = 0; i < catResults.length; i++) {
                categories.push(catResults[i].category);
            }

            res.render('equipment/list', {
                pageTitle: 'Equipment',
                user: req.session.user,
                equipmentList: results,
                categories: categories,
                searchQuery: search,
                category: category,
                error: req.flash('error')[0],
                success: req.flash('success')[0]
            });
        });
    });
});

// View one equipment item in detail
app.get('/equipment/:id', (req, res) => {
    const equipmentId = req.params.id;
    const sql = 'SELECT * FROM equipment WHERE equipment_id = ?';

    db.query(sql, [equipmentId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving equipment');
        }

        if (results.length === 0) {
            return res.send('Equipment not found');
        }

        const equipment = results[0];

        // If nobody is logged in there is no overdue loan to check for
        if (!req.session.user) {
            return res.render('equipment/detail', {
                pageTitle: equipment.name,
                user: null,
                equipment: equipment,
                hasOverdueLoan: false,
                error: req.flash('error')[0],
                success: req.flash('success')[0]
            });
        }

        // ENHANCEMENT: check whether this student already has an overdue item.
        // The view uses this to hide the Borrow button.
        const overdueSql = `SELECT COUNT(*) AS overdueCount FROM loans
                            WHERE user_id = ? AND status = 'borrowed' AND due_date < CURDATE()`;

        db.query(overdueSql, [req.session.user.user_id], (error, overdueResults) => {
            if (error) {
                console.error('Database query error:', error.message);
                return res.send('Error checking loans');
            }

            res.render('equipment/detail', {
                pageTitle: equipment.name,
                user: req.session.user,
                equipment: equipment,
                hasOverdueLoan: overdueResults[0].overdueCount > 0,
                error: req.flash('error')[0],
                success: req.flash('success')[0]
            });
        });
    });
});

// A student views their own borrowing records
app.get('/myloans', checkAuthenticated, (req, res) => {
    const userId = req.session.user.user_id;

    // JOIN so we can show the equipment name instead of just the id
    const sql = `SELECT loans.loan_id, loans.equipment_id, equipment.name,
                        loans.borrow_date, loans.due_date, loans.return_date, loans.status
                 FROM loans
                 JOIN equipment ON loans.equipment_id = equipment.equipment_id
                 WHERE loans.user_id = ?
                 ORDER BY loans.borrow_date DESC`;

    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving loans');
        }

        res.render('loans/my-loans', {
            pageTitle: 'My Loans',
            user: req.session.user,
            loans: markOverdue(results),
            error: req.flash('error')[0],
            success: req.flash('success')[0]
        });
    });
});


// Admin views every loan in the system
app.get('/admin/loans', checkAuthenticated, checkAdmin, (req, res) => {
    const sql = `SELECT loans.loan_id, users.username, equipment.name,
                        loans.borrow_date, loans.due_date, loans.return_date, loans.status
                 FROM loans
                 JOIN equipment ON loans.equipment_id = equipment.equipment_id
                 JOIN users ON loans.user_id = users.user_id
                 ORDER BY loans.due_date ASC`;

    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error retrieving loans');
        }

        const loans = markOverdue(results);

        // Count how many are overdue for the summary badge
        let overdueCount = 0;
        for (let i = 0; i < loans.length; i++) {
            if (loans[i].status === 'overdue') {
                overdueCount = overdueCount + 1;
            }
        }

        res.render('admin/loans', {
            pageTitle: 'All Loans',
            user: req.session.user,
            loans: loans,
            overdueCount: overdueCount,
            error: req.flash('error')[0],
            success: req.flash('success')[0]
        });
    });
});


// =====================================================================
// JERALD - Creating / Adding information
// =====================================================================

// Show the Add Equipment form (admin only)
app.get('/admin/equipment/add', checkAuthenticated, checkAdmin, (req, res) => {
    res.render('admin/add-equipment', {
        pageTitle: 'Add Equipment',
        user: req.session.user,
        error: req.flash('error')[0],
        success: req.flash('success')[0]
    });
});

// Process the Add Equipment form
app.post('/admin/equipment/add', checkAuthenticated, checkAdmin, upload.single('image'), (req, res) => {
    const { name, category, description, total_quantity } = req.body;
    const itemCondition = req.body.condition;

    let image;
    if (req.file) {
        image = req.file.filename;      // only the filename goes into the database
    } else {
        image = null;
    }

    // A brand new item starts with available_quantity equal to total_quantity.
    // `condition` is a reserved word in MySQL so it must be wrapped in backticks.
    const sql = `INSERT INTO equipment
                 (name, category, description, image, total_quantity, available_quantity, \`condition\`)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, category, description, image, total_quantity, total_quantity, itemCondition],
        (error, results) => {
            if (error) {
                console.error('Error adding equipment:', error.message);
                return res.send('Error adding equipment');
            }
            req.flash('success', name + ' has been added to the inventory.');
            res.redirect('/equipment');
        });
});

app.get('/equipment/:id/borrow', checkAuthenticated, (req, res) => {
    res.redirect('/equipment/' + req.params.id);
});

app.post('/equipment/:id/borrow', checkAuthenticated, (req, res) => {
    const equipmentId = req.params.id;
    const userId = req.session.user.user_id;

    if (req.session.user.role !== 'student') {
        req.flash('error', 'Only students can borrow equipment.');
        return res.redirect('/equipment/' + equipmentId);
    }

    const overdueSql = `SELECT COUNT(*) AS overdueCount FROM loans
                        WHERE user_id = ? AND status = 'borrowed' AND due_date < CURDATE()`;

    db.query(overdueSql, [userId], (error, overdueResults) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.send('Error checking loans');
        }

        if (overdueResults[0].overdueCount > 0) {
            req.flash('error', 'You have an overdue item. Please return it before borrowing again.');
            return res.redirect('/myloans');
        }

        const stockSql = 'SELECT available_quantity FROM equipment WHERE equipment_id = ?';
        db.query(stockSql, [equipmentId], (error, stockResults) => {
            if (error) {
                console.error('Database query error:', error.message);
                return res.send('Error checking stock');
            }

            if (stockResults.length === 0) {
                return res.send('Equipment not found');
            }

            if (stockResults[0].available_quantity <= 0) {
                req.flash('error', 'This item is currently unavailable.');
                return res.redirect('/equipment/' + equipmentId);
            }

            const loanSql = `INSERT INTO loans (user_id, equipment_id, borrow_date, due_date, status)
                             VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'borrowed')`;

            db.query(loanSql, [userId, equipmentId], (error) => {
                if (error) {
                    console.error('Error creating loan:', error.message);
                    return res.send('Error creating loan');
                }

                const updateStockSql = `UPDATE equipment SET available_quantity = available_quantity - 1 WHERE equipment_id = ?`;
                db.query(updateStockSql, [equipmentId], (error) => {
                    if (error) {
                        console.error('Error updating stock:', error.message);
                        return res.send('Error updating stock');
                    }

                    req.flash('success', 'Equipment borrowed successfully.');
                    res.redirect('/myloans');
                });
            });
        });
    });
});

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
            return res.send('Error retrieving equipment');
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


// =====================================================================
// HONG WEI - Removing information
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

        // Step 2 - remove their (returned) loan history first,
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


// =====================================================================
// START THE SERVER
// =====================================================================
const START_PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_RETRIES = 10;

function startServer(port, attempt = 1) {
    const server = app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE' && attempt <= MAX_PORT_RETRIES) {
            const nextPort = port + 1;
            console.warn(`Port ${port} is busy. Retrying on port ${nextPort}...`);
            startServer(nextPort, attempt + 1);
            return;
        }

        console.error('Failed to start server:', error.message);
        process.exit(1);
    });
}

startServer(START_PORT);
