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
    { loan_id: 1, equipment_id: 1, name: 'Canon EOS 200D', borrow_date: '2026-07-01', due_date: '2026-07-08', return_date: null, status: 'overdue' },
    { loan_id: 2, equipment_id: 3, name: 'Tripod Stand', borrow_date: '2026-07-10', due_date: '2026-07-17', return_date: null, status: 'borrowed' },
    { loan_id: 3, equipment_id: 4, name: 'Rode Wireless Mic', borrow_date: '2026-06-20', due_date: '2026-06-27', return_date: '2026-06-25', status: 'returned' }
];

const mockAllLoans = mockLoans.map(l => ({ ...l, username: 'alice_tan' }));

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
    const equipment = mockEquipmentList.find(e => e.equipment_id === Number(req.params.id)) || mockEquipmentList[0];
    res.render('equipment/detail', {
        pageTitle: equipment.name,
        user: mockStudent,
        equipment,
        hasOverdueLoan: mockLoans.some(l => l.status === 'overdue')
    });
});

app.get('/myloans', (req, res) => {
    res.render('loans/my-loans', {
        pageTitle: 'My Loans',
        user: mockStudent,
        loans: mockLoans
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
    res.render('admin/loans', {
        pageTitle: 'All Loans',
        user: mockAdmin,
        loans: mockAllLoans,
        overdueCount: mockAllLoans.filter(l => l.status === 'overdue').length
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
