// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ⚠️ Required for Railway:
  ssl: {
    rejectUnauthorized: true // Ensures secure connection
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
