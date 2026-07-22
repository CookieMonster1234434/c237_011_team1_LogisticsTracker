# CLAUDE.md — c237_011_team1_LogisticsTracker

Project instructions for Claude Code. Read `docs/C237_CA2_SPEC.md` for the full
assessment brief and `docs/C237_SYLLABUS_REFERENCE.md` for the only techniques
that are permitted in this module.

---

## What this project is

A school **equipment logistics tracker**. Students browse and borrow CCA /
school equipment; an admin manages the inventory and monitors loans.

Built for **C237 CA2**, a graded team assignment. Six students each own one
feature and are individually examined on it in a live viva.

---

## Hard constraints — do not violate these

These come from the assessment brief. Breaking them costs marks.

1. **Only use techniques taught in class.** The syllabus is Lessons 01–20 in
   `docs/C237_SYLLABUS_REFERENCE.md`. If a technique is not in there, do not
   introduce it. Specifically **do not** suggest or add:
   - TypeScript, React, Vue, Next.js, Tailwind, or any SPA framework
   - Sequelize, Prisma, Knex, or any ORM
   - `async`/`await` or Promises for database calls — **use callbacks**
   - bcrypt, Passport.js, JWT — auth uses `SHA1()` and `express-session`
   - Express Router in separate files unless explicitly asked
   - `.env` / dotenv unless explicitly asked
2. **Nothing may be hardcoded.** The brief states plainly: *"No marks should be
   given to features that are hardcoded."* Every list, dropdown, count, and
   status must come from a database query. Never mock or stub data.
3. **No website templates from the internet.** All markup is written by the team.
4. **`app.js` is collaborative.** Keep the named ownership sections intact.
   Never restructure the whole file in one pass — it destroys the git history
   that proves individual contribution.
5. **Every feature must be explainable by a 17–19 year old student** who is
   about to be questioned on it. Prefer obvious, verbose code over clever code.
   No one-liners that compress three ideas into one.

---

## Tech stack (fixed)

| Layer | Choice |
|---|---|
| Runtime | Node.js |
| Server | Express 4 |
| Views | EJS with partials |
| Database | MySQL via `mysql2` (callback API, **not** promises) |
| Sessions | `express-session` |
| Flash messages | `connect-flash` |
| File upload | `multer` (disk storage → `public/uploads`) |
| CSS | Bootstrap 5.3 via CDN + `public/css/style.css` |

Run locally:

```bash
npm install
npx nodemon app.js      # http://localhost:3000
```

---

## Code conventions

Follow the patterns in `docs/C237_SYLLABUS_REFERENCE.md`, Lessons 14–19.

**Database calls — always callbacks, always `?` placeholders:**

```javascript
const sql = 'SELECT * FROM equipment WHERE equipment_id = ?';
db.query(sql, [equipmentId], (error, results) => {
    if (error) {
        console.error('Database query error:', error.message);
        return res.send('Error retrieving equipment');
    }
    // ...
});
```

Never concatenate user input into SQL. The `?` placeholder is what prevents
SQL injection, and this is a likely viva question.

**Naming:** database columns and route params are `snake_case`
(`equipment_id`, `total_quantity`, `borrow_date`). JavaScript variables are
`camelCase` (`equipmentId`, `overdueCount`). Do not "tidy" one into the other.

**`condition` is a reserved word in MySQL.** It must always be written in
backticks: `` `condition` ``.

**Every `res.render()` must pass:** `pageTitle`, `user` (from
`req.session.user`), and `error` / `success` from
`req.flash('error')[0]` / `req.flash('success')[0]`. The `partials/alert.ejs`
partial expects `error` and `success` as **strings**, not arrays.

**Dates:** the MySQL connection sets `dateStrings: true`, so `DATE` columns
arrive as `'YYYY-MM-DD'` strings. Compare them as strings. Do not use
`toISOString()` — it shifts the date by a day in Singapore's timezone (UTC+8).

---

## Access control

Two roles: `student` and `admin`, stored in `users.role`.

```javascript
checkAuthenticated   // logged in at all?
checkAdmin           // logged in AND role === 'admin'
```

Chain them on protected routes: `app.get('/admin/loans', checkAuthenticated, checkAdmin, ...)`.

Every admin route must be guarded **server-side**. Hiding a button in the EJS
view is not access control — a student typing the URL directly must still be
blocked. This is the single most likely viva question.

New registrations are always created as `student`. Admin accounts are inserted
directly in the `.sql` seed file.

---

## Database schema

```
users     user_id · username · email · password (SHA1) · role
equipment equipment_id · name · category · description · image
          · total_quantity · available_quantity · `condition`
loans     loan_id · user_id (FK) · equipment_id (FK)
          · borrow_date · due_date · return_date · status
```

`loans.status` in the database is only ever `'borrowed'` or `'returned'`.
`'overdue'` is **derived at runtime**, never stored.

`loans` has foreign keys to both `users` and `equipment`. Deleting an
equipment row that still has loan records raises **MySQL ERROR 1451**, so the
delete route must clear dependent rows first.

---

## Feature ownership

Do not refactor across these boundaries without being asked. Each student is
examined only on their own section.

| Owner | Feature | Routes |
|---|---|---|
| Joshua | Registration, login, logout, access control | `/register`, `/login`, `/logout`, both middleware fns |
| Jerald | Creating information | `POST /admin/equipment/add`, `POST /equipment/:id/borrow` |
| Max | Viewing / displaying | `GET /equipment`, `/equipment/:id`, `/myloans`, `/admin/loans` |
| Shakir | Updating / editing | `GET+POST /admin/equipment/:id/edit`, `POST /myloans/:id/return` |
| Hong Wei | Removing information | `POST /admin/equipment/:id/delete` |
| Joel | Search & filter, MySQL connection | filter logic inside `GET /equipment`, `db` config, schema |

---

## The enhancement — overdue tracking

The one feature that lifts this above plain CRUD. It must keep working, and
any change to it must stay explainable.

- `markOverdue()` compares `due_date` against today each time a page loads, so
  the status is always correct for the day it is viewed.
- Overdue rows render red; the admin dashboard shows a live count.
- **A student with an overdue item cannot borrow anything else.** The Borrow
  button is hidden in the view *and* the `POST` route re-checks server-side, so
  the block cannot be bypassed by sending the request directly.

That server-side re-check is the point. Do not remove it as "redundant".

---

## When making changes

- Change the smallest amount necessary. Do not reformat untouched code.
- Preserve the `// ===== OWNER NAME =====` section banners in `app.js`.
- After any change to a route, verify the full flow still works:
  user action → route → SQL query → database → response.
- If a change affects the schema, update `c237_011_team1_logisticstracker.sql` too —
  the `.sql` file is a graded deliverable.
- Explain *why*, not just *what*. The student has to defend this in a viva.

## Do not

- Add features nobody asked for.
- "Improve" security beyond the syllabus (no bcrypt, no CSRF tokens, no helmet).
- Commit credentials. The Azure MySQL host/password must never reach a public repo.
- Commit `node_modules/`.
