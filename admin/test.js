const express = require("express");
const mysql = require('mysql');
const cors = require("cors");


const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" }));
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

app.get("/users", (req, result) => {

    const query = "SELECT * FROM users";

    db.query(query, (err, res) => {
        if (err) {
            console.log("error occured while fetching");
            return;
        }

        result.json({ users: [res[0].first_name, res[1].first_name] });
    })

})

app.listen(9000, () => {
    console.log("server started");
})