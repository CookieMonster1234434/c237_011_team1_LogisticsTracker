-- =====================================================================
-- C237 CA2 - CCA Logistics Tracker (c237_011 Team 1)
-- Database: c237_011_team1_logisticstracker
-- =====================================================================
-- NOTE: When importing to Azure / filess.io, DELETE the two lines below
-- (CREATE DATABASE and USE), then select your online database in
-- MySQL Workbench before running this script.
-- =====================================================================


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

