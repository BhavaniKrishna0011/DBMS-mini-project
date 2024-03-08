const mysql = require('mysql');

const dbConfig = {
    host: "localhost",
    user: "root",
    passwor: "",
    database: "library data management"
};

const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database');
});

function getCount(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0].count);
            }
        });
    });
}

async function getAuthorCount() {
    const query = 'SELECT COUNT(*) as count FROM authors';
    return await getCount(query);
}

async function getUserCount() {
    const query = 'SELECT COUNT(*) as count FROM users';
    return await getCount(query);

}

async function getBookCount() {
    const query = 'SELECT COUNT(*) as count FROM books';
    return await getCount(query);
}

async function getIssueBookCount() {
    const query = 'SELECT COUNT(*) as count FROM issued_books';
    return await getCount(query);
}

async function getCategoryCount() {
    const query = 'SELECT COUNT(*) as count FROM category';
    return await getCount(query);
}

// Export the functions
module.exports = {
    getAuthorCount,
    getUserCount,
    getBookCount,
    getIssueBookCount,
    getCategoryCount
};