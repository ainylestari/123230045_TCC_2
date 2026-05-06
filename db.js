const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '34.172.113.167',
    user: 'admin',
    password: 'mypassword',
    database: 'notes_123230045',
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255),
    isi TEXT
)
`;

db.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log("Table notes ready");
});

module.exports = db;