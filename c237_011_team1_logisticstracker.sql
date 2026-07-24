-- =====================================================================
-- C237 CA2 - CCA Logistics Tracker (c237_011 Team 1)
-- Database: c237_011_team1_logisticstracker
-- =====================================================================
-- NOTE: When importing to Azure / filess.io, DELETE the two lines below
-- (CREATE DATABASE and USE), then select your online database in
-- MySQL Workbench before running this script.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS c237_011_team1_logisticstracker;
USE c237_011_team1_logisticstracker;


-- ---------------------------------------------------------------------
-- TABLE: users
-- role is either 'student' or 'admin'
-- ---------------------------------------------------------------------
CREATE TABLE users (
    user_id  INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50)  NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(10)  NOT NULL DEFAULT 'student'
);


-- ---------------------------------------------------------------------
-- TABLE: equipment
-- `condition` is a reserved word in MySQL, so it is written in backticks
-- ---------------------------------------------------------------------
CREATE TABLE equipment (
    equipment_id       INT AUTO_INCREMENT PRIMARY KEY,
    name               VARCHAR(100) NOT NULL,
    category           VARCHAR(50)  NOT NULL,
    description        TEXT,
    image              VARCHAR(255),
    total_quantity     INT NOT NULL DEFAULT 1,
    available_quantity INT NOT NULL DEFAULT 1,
    `condition`        VARCHAR(20)  NOT NULL DEFAULT 'Good'
);


-- ---------------------------------------------------------------------
-- TABLE: loans
-- Links one student to one unit of equipment.
-- status stored in the database is 'borrowed' or 'returned'.
-- 'overdue' is worked out in app.js by comparing due_date with today.
-- ---------------------------------------------------------------------
CREATE TABLE loans (
    loan_id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL,
    equipment_id INT NOT NULL,
    borrow_date  DATE NOT NULL,
    due_date     DATE NOT NULL,
    return_date  DATE DEFAULT NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'borrowed',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
);

-- ---------------------------------------------------------------------
-- TABLE: tickets
-- Simple borrow approval workflow: pending -> approved/rejected
-- ---------------------------------------------------------------------
CREATE TABLE tickets (
    ticket_id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT NOT NULL,
    equipment_id   INT NOT NULL,
    request_date   DATE NOT NULL,
    due_date       DATE NOT NULL,
    duration_days  INT NOT NULL DEFAULT 7,
    reason         VARCHAR(255) DEFAULT NULL,
    status         VARCHAR(20) NOT NULL DEFAULT 'pending',
    review_note    VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id)
);

CREATE TABLE equipment_requests (
    request_id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    name            VARCHAR(100) NOT NULL,
    category        VARCHAR(50) NOT NULL,
    description     TEXT NOT NULL,
    quantity        INT NOT NULL DEFAULT 1,
    request_date    DATE NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'pending',
    review_note     VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- ---------------------------------------------------------------------
-- SAMPLE USERS
-- Passwords are hashed with SHA1() exactly the way app.js does it.
--   admin@myrp.edu.sg  / admin123     (admin)
--   alice@myrp.edu.sg  / student123   (student)
--   hongwei@myrp.edu.sg / student123  (student)
-- ---------------------------------------------------------------------
INSERT INTO users (username, email, password, role) VALUES
('admin_joel', 'admin@myrp.edu.sg',   SHA1('admin123'),   'admin'),
('alice_tan',  'alice@myrp.edu.sg',   SHA1('student123'), 'student'),
('hong_wei',   'hongwei@myrp.edu.sg', SHA1('student123'), 'student');


-- ---------------------------------------------------------------------
-- SAMPLE EQUIPMENT
-- ---------------------------------------------------------------------
INSERT INTO equipment (name, category, description, image, total_quantity, available_quantity, `condition`) VALUES
('Basketball',        'Sports',           'Size 7 competition basketball.',              NULL, 8,  8,  'Good'),
('Badminton Racket',  'Sports',           'Yonex racket, strung, with cover.',           NULL, 10, 10, 'Good'),
('Snare Drum',        'Band',             'Marching snare drum with carrier and sticks.', NULL, 4, 4,  'New'),
('DSLR Camera',       'Media Club',       'Canon DSLR for event photography.',           NULL, 3,  3,  'Fair'),
('PA Speaker',        'Performing Arts',  'Portable PA speaker for performances.',        NULL, 5, 5,  'Good'),
('Camping Tent',      'Uniformed Group',  '4-person tent for NCC / Scouts camps.',       NULL, 6,  6,  'Worn');


-- ---------------------------------------------------------------------
-- SAMPLE LOANS
-- One returned record, one active, and one deliberately overdue so the
-- overdue enhancement can be demonstrated immediately after importing.
-- ---------------------------------------------------------------------
INSERT INTO loans (user_id, equipment_id, borrow_date, due_date, return_date, status) VALUES
(2, 4, DATE_SUB(CURDATE(), INTERVAL 20 DAY), DATE_SUB(CURDATE(), INTERVAL 13 DAY), DATE_SUB(CURDATE(), INTERVAL 15 DAY), 'returned'),
(2, 1, DATE_SUB(CURDATE(), INTERVAL 12 DAY), DATE_SUB(CURDATE(), INTERVAL 5 DAY),  NULL, 'borrowed'),
(3, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY),  DATE_ADD(CURDATE(), INTERVAL 5 DAY),  NULL, 'borrowed');

-- Keep available_quantity in step with the two active loans above
UPDATE equipment SET available_quantity = available_quantity - 1 WHERE equipment_id = 1;
UPDATE equipment SET available_quantity = available_quantity - 1 WHERE equipment_id = 3;
