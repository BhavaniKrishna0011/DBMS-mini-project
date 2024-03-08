const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal server error');
        } else {
            res.redirect('/index.html'); // Replace with the correct path
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});