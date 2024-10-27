const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json()); // For parsing application/json

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'contacts', // replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Test endpoint to check if the API is working
app.get('/api/test', (req, res) => {
  res.send('API is working');
});

// API endpoint to handle form submission
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body; // Removed subject

  // Basic validation
  if (!name || !email || !message) { // Updated validation
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Log the submission
  console.log(`Received submission: Name: ${name}, Email: ${email}, Message: ${message}`);

  // Here you can add logic to save the data to your MySQL database.
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    // Send a success response
    res.json({ success: true });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
