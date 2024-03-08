const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())

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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/add', (req, res) => {
    const { cat_name } = req.body;

    const query = 'INSERT INTO category (cat_name) VALUES (?)';

    db.query(query, [cat_name], (err, results) => {
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