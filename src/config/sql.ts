const mysql = require('mysql');
require('dotenv').config();

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});


function connectSQLServer() {
    // Connect to MySQL
    connection.connect((err: any) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL');
    });
}

module.exports = {
    connectSQLServer
};

