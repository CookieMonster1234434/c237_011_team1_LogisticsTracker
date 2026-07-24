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
