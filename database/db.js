const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:"movies",
    port: 3306,
});

connection.connect((err) => {
    if (err) throw err
    console.log("db connected");
    
});

module.exports = connection;