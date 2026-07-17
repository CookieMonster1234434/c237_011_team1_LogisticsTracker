const express = require('express');
const mysql = require('mysql2');
const app = express();
const multer = require('multer');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------
// TEMPORARY PREVIEW ROUTES
// These render the views with hardcoded mock data so the frontend can be
// clicked through before real auth/DB routes are built. Replace with the
// actual routes per the route map (auth, equipment CRUD, loans, admin).
// ---------------------------------------------------------------------

const mockStudent = { user_id: 1, username: 'alice_tan', email: 'alice@myrp.edu.sg', role: 'student' };
const mockAdmin = { user_id: 2, username: 'admin_joel', email: 'joel@myrp.edu.sg', role: 'admin' };

const mockEquipmentList = [
    { equipment_id: 1, name: 'Canon EOS 200D', category: 'Camera', description: 'DSLR camera kit with 18-55mm lens.', image: null, total_quantity: 4, available_quantity: 2, condition: 'Good' },
    { equipment_id: 2, name: 'Dell Latitude 5420', category: 'Laptop', description: 'Business laptop, i5, 16GB RAM.', image: null, total_quantity: 10, available_quantity: 0, condition: 'Good' },
    { equipment_id: 3, name: 'Tripod Stand', category: 'Accessory', description: 'Adjustable aluminium tripod.', image: null, total_quantity: 6, available_quantity: 6, condition: 'New' },
    { equipment_id: 4, name: 'Rode Wireless Mic', category: 'Audio', description: 'Lavalier wireless microphone set.', image: null, total_quantity: 3, available_quantity: 1, condition: 'Fair' }
];

const mockLoans = [
    { loan_id: 1, user_id: 1, equipment_id: 1, name: 'Canon EOS 200D', borrow_date: '2026-07-01', due_date: '2026-07-08', return_date: null, status: 'overdue' },
    { loan_id: 2, user_id: 1, equipment_id: 3, name: 'Tripod Stand', borrow_date: '2026-07-10', due_date: '2026-07-17', return_date: null, status: 'borrowed' },
    { loan_id: 3, user_id: 1, equipment_id: 4, name: 'Rode Wireless Mic', borrow_date: '2026-06-20', due_date: '2026-06-27', return_date: '2026-06-25', status: 'returned' }
];

function getStudentLoans() {
    return mockLoans.filter(loan => loan.user_id === mockStudent.user_id);
}

function getAllLoans() {
    return mockLoans.map(l => ({ ...l, username: mockStudent.username }));
}

function getEquipment(id) {
    const equipmentId = Number(id);
    return mockEquipmentList.find(e => e.equipment_id === equipmentId) || null;
}

function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

app.get('/', (req, res) => res.redirect('/equipment'));

app.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'Login' });
});

app.get('/register', (req, res) => {
    res.render('register', { pageTitle: 'Register' });
});

app.get('/equipment', (req, res) => {
    const { search = '', category = '' } = req.query;
    let list = mockEquipmentList;
    if (search) list = list.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter(e => e.category === category);
    res.render('equipment/list', {
        pageTitle: 'Equipment',
        user: mockStudent,
        equipmentList: list,
        categories: [...new Set(mockEquipmentList.map(e => e.category))],
        searchQuery: search,
        category
    });
});

app.get('/equipment/:id', (req, res) => {
    const equipment = getEquipment(req.params.id);
    if (!equipment) {
        return res.redirect('/equipment');
    }

    res.render('equipment/detail', {
        pageTitle: equipment.name,
        user: mockStudent,
        equipment,
        hasOverdueLoan: getStudentLoans().some(l => l.status === 'overdue')
    });
});

app.get('/equipment/:id/borrow', (req, res) => {
    const equipment = getEquipment(req.params.id);
    if (!equipment) {
        return res.redirect('/equipment');
    }

    res.render('user/borrow', {
        pageTitle: 'Borrow Equipment',
        user: mockStudent,
        equipment,
        hasOverdueLoan: getStudentLoans().some(l => l.status === 'overdue'),
        error: req.query.error,
        success: req.query.success
    });
});

app.post('/equipment/:id/borrow', (req, res) => {
    const equipment = getEquipment(req.params.id);
    if (!equipment) {
        return res.redirect('/equipment');
    }

    const studentLoans = getStudentLoans();
    if (studentLoans.some(l => l.status === 'overdue')) {
        return res.redirect(`/equipment/${equipment.equipment_id}/borrow?error=Return%20your%20overdue%20item%20before%20borrowing%20more.`);
    }

    if (equipment.available_quantity <= 0) {
        return res.redirect(`/equipment/${equipment.equipment_id}/borrow?error=Sorry,%20this%20item%20is%20currently%20unavailable.`);
    }

    const days = Math.max(1, Math.min(30, Number(req.body.durationDays || 7)) || 7);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);

    mockLoans.push({
        loan_id: mockLoans.length + 1,
        user_id: mockStudent.user_id,
        equipment_id: equipment.equipment_id,
        name: equipment.name,
        borrow_date: formatDate(new Date()),
        due_date: formatDate(dueDate),
        return_date: null,
        status: 'borrowed'
    });

    equipment.available_quantity = Math.max(0, equipment.available_quantity - 1);
    return res.redirect('/myloans?success=Equipment%20borrowed%20successfully.');
});

app.post('/myloans/:id/return', (req, res) => {
    const loan = mockLoans.find(item => item.loan_id === Number(req.params.id));
    if (!loan) {
        return res.redirect('/myloans?error=Loan%20not%20found.');
    }

    loan.return_date = formatDate(new Date());
    loan.status = 'returned';

    const equipment = getEquipment(loan.equipment_id);
    if (equipment) {
        equipment.available_quantity = Math.min(equipment.total_quantity, equipment.available_quantity + 1);
    }

    return res.redirect('/myloans?success=Equipment%20returned%20successfully.');
});

app.get('/myloans', (req, res) => {
    res.render('loans/my-loans', {
        pageTitle: 'My Loans',
        user: mockStudent,
        loans: getStudentLoans(),
        error: req.query.error,
        success: req.query.success
    });
});

app.get('/admin/equipment/add', (req, res) => {
    res.render('admin/add-equipment', { pageTitle: 'Add Equipment', user: mockAdmin });
});

app.get('/admin/equipment/:id/edit', (req, res) => {
    const equipment = mockEquipmentList.find(e => e.equipment_id === Number(req.params.id)) || mockEquipmentList[0];
    res.render('admin/edit-equipment', { pageTitle: 'Edit Equipment', user: mockAdmin, equipment });
});

app.get('/admin/loans', (req, res) => {
    const allLoans = getAllLoans();
    res.render('admin/loans', {
        pageTitle: 'All Loans',
        user: mockAdmin,
        loans: allLoans,
        overdueCount: allLoans.filter(l => l.status === 'overdue').length
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
