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
app.use(cors({
    origin: ["http://127.0.0.1:5501"]
}));
app.use(bodyParser.urlencoded({ extended: true }));

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM admins WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = results[0];
        if (user.password !== password) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        res.status(200).json({ message: 'Registration successful. You may login now.' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});