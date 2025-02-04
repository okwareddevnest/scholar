const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file
console.log('Environment variables loaded:', process.env);

async function testConnection() {
    const connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    try {
        const [rows] = await connection.query('SELECT 1 + 1 AS solution');
        console.log('Database connection successful:', rows[0].solution); // Should print 2
    } catch (error) {
        console.error('Database connection failed:', error.message);
    } finally {
        await connection.end();
    }
}

testConnection();
