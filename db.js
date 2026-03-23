const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notes_app',
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255),
    isi TEXT,
)
`;

db.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log("Table notes ready");
});

module.exports = db;