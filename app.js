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
//   Joel     - Filter and search, mysql
// =====================================================================

const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();


// =====================================================================
// JOEL - MySQL database connection
// =====================================================================
const db = mysql.createConnection({
    host: 'c237-asyraf-mysql.mysql.database.azure.com',
    user: 'c237_011',
    password: 'c237011@2026!',
    database: 'c237_011_team1_logisticstracker',
    dateStrings: true,
    ssl: { rejectUnauthorized: false }
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
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use(flash());


// =====================================================================
// MAX - Viewing / Displaying information
// =====================================================================

app.get('/', (req, res) => {
    res.redirect('/equipment');
});

// ---- JOEL owns the search / filter logic inside this route ----
app.get('/equipment', (req, res) => {
    // Read what the user typed / selected in the filter bar
    const search = (req.query.search || '').trim();
    const category = (req.query.category || '').trim();

    // Build the SQL step by step depending on what the user chose.
    // Using ? placeholders keeps the query safe from SQL injection.
    let sql = 'SELECT * FROM equipment WHERE name LIKE ?';
    const params = ['%' + search + '%'];

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
        db.query(catSql, (catError, catResults) => {
            if (catError) {
                console.error('Database query error:', catError.message);
                return res.send('Error retrieving categories');
            }

            // The view expects a plain list of names, e.g. ['Camera', 'Laptop']
            const categories = catResults.map((row) => row.category);

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
