const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library data management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

app.use(cors({
    origin: ["http://127.0.0.1:5500"]
}));
app.use(bodyParser.urlencoded({ extended: true }));
// Registration endpoint
app.post('/register', (req, res) => {
    const { first_name, last_name, email, gender, password, number } = req.body;

    const query = `INSERT INTO users (first_name, last_name, email, gender, password,number) VALUES (?, ?, ?, ?, ?,?)`;
    db.query(query, [first_name, last_name, email, gender, password, number], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Registration successful. You may login now.' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

db.query(' select * from users ', (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})