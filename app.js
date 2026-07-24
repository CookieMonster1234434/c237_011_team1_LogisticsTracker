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

const checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }

    req.flash('error', 'Please log in to view this resource');
    res.redirect('/login');
};

const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }

    req.flash('error', 'Access denied. Admin only.');
    res.redirect('/equipment');
};



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

// Add a new equipment item
app.post('/admin/equipment/add', checkAuthenticated, checkAdmin, upload.single('image'), (req, res) => {
    const { name, category, description, total_quantity, condition } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = `INSERT INTO equipment
                 (name, category, description, image, total_quantity, available_quantity, \`condition\`)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, category, description, image, total_quantity, total_quantity, condition], (error) => {
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

// Borrow equipment
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

// Request a new equipment item
app.get('/equipment/requests/new', checkAuthenticated, (req, res) => {
    res.render('tickets/new-equipment-request', {
        pageTitle: 'Request Equipment',
        user: req.session.user,
        error: req.flash('error')[0],
        success: req.flash('success')[0]
    });
});

app.post('/equipment/requests/new', checkAuthenticated, (req, res) => {
    const { name, category, description, quantity } = req.body;

    if (!name || !category || !description || !quantity) {
        req.flash('error', 'All fields are required.');
        return res.redirect('/equipment/requests/new');
    }

    const sql = `INSERT INTO equipment_requests
                 (user_id, name, category, description, quantity, request_date, status)
                 VALUES (?, ?, ?, ?, ?, CURDATE(), 'pending')`;

    db.query(sql, [req.session.user.user_id, name, category, description, quantity], (error) => {
        if (error) {
            console.error('Error creating equipment request:', error.message);
            return res.send('Error creating equipment request');
        }

        req.flash('success', 'Your equipment request has been submitted.');
        res.redirect('/equipment/requests/new');
    });
});
