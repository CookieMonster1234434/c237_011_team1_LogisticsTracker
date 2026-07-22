# c237_011_team1_LogisticsTracker

C237 CA2 — **CCA Logistics Tracker**: a borrowing system for CCA / school
equipment (sports, band, uniformed groups, media club, performing arts).
Node.js + Express + EJS + MySQL.

## Roles

| Role | Can do |
|---|---|
| student | Browse & search equipment, borrow, view own loans, return |
| admin | Everything above, plus add / edit / delete equipment and view all loans |

## Setup

1. Import the database:
   - Open MySQL Workbench
   - Run `c237_011_team1_logisticstracker.sql`
2. In `app.js`, change `password: 'YOUR_MYSQL_PASSWORD'` to your own MySQL password.
3. Install packages and run:
   ```
   npm install
   npx nodemon app.js
   ```
4. Open http://localhost:3000

## Test accounts

| Email | Password | Role |
|---|---|---|
| admin@myrp.edu.sg | admin123 | admin |
| alice@myrp.edu.sg | student123 | student (has an overdue loan) |
| hongwei@myrp.edu.sg | student123 | student |

New sign-ups are always created as `student`. Admin accounts are added
directly in the database by the logistics teacher.

## Route map

| Route | Method | Access | Owner |
|---|---|---|---|
| /register | GET, POST | public | Joshua |
| /login | GET, POST | public | Joshua |
| /logout | POST | logged in | Joshua |
| /equipment | GET | public | Max / Joel |
| /equipment/:id | GET | public | Max |
| /equipment/:id/borrow | POST | student | Jerald |
| /myloans | GET | logged in | Max |
| /myloans/:id/return | POST | student | Shakir |
| /admin/equipment/add | GET, POST | admin | Jerald |
| /admin/equipment/:id/edit | GET, POST | admin | Shakir |
| /admin/equipment/:id/delete | POST | admin | Hong Wei |
| /admin/loans | GET | admin | Max |

## Enhancement — overdue tracking

The database only stores `borrowed` or `returned`. A loan becomes **overdue**
when it is still borrowed and `due_date` has passed. This is calculated in
`markOverdue()` in `app.js` each time a page loads, so it is always correct
for the day it is viewed.

It changes real behaviour, not just colour:
- Overdue rows are highlighted red and the admin dashboard shows a live count.
- A student with an overdue item **cannot borrow anything else** until it is
  returned. The Borrow button is hidden, and the POST route re-checks
  server-side so the block cannot be bypassed by sending the request directly.

## Notes

- Passwords are hashed with `SHA1()` as taught in class. Real production
  systems should use bcrypt, which adds a salt and is far slower to brute-force.
- `condition` is a reserved word in MySQL, so it is written in backticks.
- Uploaded photos go to `public/uploads/` and are served at `/uploads/<filename>`.
