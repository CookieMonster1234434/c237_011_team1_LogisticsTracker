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
  const equipmentId = req.params.id;
  // fetch equipment details from DB if needed
  db.query('SELECT * FROM equipment WHERE equipment_id = ?', [equipmentId], (err, results) => {
    if (err) return res.send('Error loading equipment');
    if (!results.length) return res.send('Equipment not found');
    res.render('borrow', {
      pageTitle: 'Borrow Equipment',
      equipment: results[0],
      user: req.session.user,
      messages: {
        error: req.flash('error'),
        success: req.flash('success')
      }
    });
  });
});


// Borrow equipment
app.post('/equipment/:id/borrow', checkAuthenticated, (req, res) => {
  const equipmentId = req.params.id;
  const userId = req.session.user.user_id;

  if (req.session.user.role !== 'student') {
    req.flash('error', 'Only students can borrow equipment.');
    return res.redirect(`/equipment/${equipmentId}`);
  }

  const overdueSql = `SELECT COUNT(*) AS overdueCount 
                      FROM loans WHERE user_id = ? AND status = 'borrowed' AND due_date < CURDATE()`;

  db.query(overdueSql, [userId], (err, overdue) => {
    if (err) return res.send('Error checking loans');
    if (overdue[0].overdueCount > 0) {
      req.flash('error', 'You have an overdue item. Please return it before borrowing again.');
      return res.redirect('/myloans');
    }

    db.query('SELECT available_quantity FROM equipment WHERE equipment_id = ?', [equipmentId], (err, stock) => {
      if (err) return res.send('Error checking stock');
      if (!stock.length) return res.send('Equipment not found');
      if (stock[0].available_quantity <= 0) {
        req.flash('error', 'This item is currently unavailable.');
        return res.redirect(`/equipment/${equipmentId}`);
      }

const duration = parseInt(req.body.duration, 10) || 7;
const loanSql = `INSERT INTO loans (user_id, equipment_id, borrow_date, due_date, status)
                 VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ? DAY), 'borrowed')`;


      db.query(loanSql, [userId, equipmentId], (err) => {
        if (err) return res.send('Error creating loan');

        db.query('UPDATE equipment SET available_quantity = available_quantity - 1 WHERE equipment_id = ?', [equipmentId], (err) => {
          if (err) return res.send('Error updating stock');
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

app.get('/admin/equipment/requests', checkAuthenticated, checkAdmin, (req, res) => {
    db.query('SELECT * FROM equipment_requests ORDER BY request_date DESC', (error, results) => {
        if (error) return res.send('Error fetching equipment requests');
        res.render('admin/equipment-requests', { requests: results });
    });
});
