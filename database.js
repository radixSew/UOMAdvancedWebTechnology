const sqlite3 = require('sqlite3').verbose();
const DB_SOURCE = "your_database.sqlite"; // Replace with your database file path

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite Database');

        // Create the 'customer' table
        db.run(`CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            email TEXT,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timestamp TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Table "customer" created or already exists.');
            }
        });
    }
});

module.exports = db;
