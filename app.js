// =====================================================================
// C237 CA2 - Logistics Tracker (c237_011 Team 1)
// =====================================================================
// app.js is shared by the whole team.
// Each member owns the section marked with their name below.
//
//   Joshua   - Registration, Login, Logout, Access Control
//   Jerald   - Creating / Adding information
//   Maximus  - Viewing / Displaying information and image upload
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
// Maximus - Viewing / Displaying information
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
// Maximus - Image Upload
// =====================================================================

// Process the Add Equipment form
app.post('/admin/equipment/add', checkAuthenticated, checkAdmin, upload.single('image'), (req, res) => {
    const { name, category, description, total_quantity } = req.body;
    const itemCondition = req.body.condition;

    // Maximus: Update the route /admin/equipment/add in app.js to handle file upload
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



// =====================================================================
// Maximus - Replace Image
// =====================================================================

// Save the edited values back into the database
app.post('/admin/equipment/:id/edit', checkAuthenticated, checkAdmin, upload.single('image'), (req, res) => {
    const equipmentId = req.params.id;
    const { name, category, description, total_quantity } = req.body;

    // Maximus: Update the post route for /admin/equipment/:id/edit in app.js to handle file upload
    let image = req.body.currentImage; //retrieve current image filename
        if (req.file) { //if new image is uploaded
            image = req.file.filename; // set image to be new image filename
        }

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
