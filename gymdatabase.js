const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database Configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '2004',
  database: 'gymmanagement'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/members', (req, res) => {
  pool.query("SELECT * FROM Members", (error, results) => {
    if (error) throw error;
    res.render('members.html', { members_data: results });
  });
});

app.post('/insert_member', (req, res) => {
  const { name, phone, email, membership_type, join_date } = req.body;
  const sql = "INSERT INTO Members (name, contact_number, email, membership_type, start_date) VALUES (?, ?, ?, ?, ?)";
  const values = [name, phone, email, membership_type, join_date];

  pool.query(sql, values, (error, results) => {
    if (error) throw error;
    res.redirect('/members');
  });
});

// Similarly, define routes for other CRUD operations on Trainers, Classes, Payments, and Attendance tables

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
