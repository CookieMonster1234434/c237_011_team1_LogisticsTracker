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