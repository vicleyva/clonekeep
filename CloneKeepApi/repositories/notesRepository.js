const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function createNoteInDatabase(note) {
  try {
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'INSERT INTO notes (uuid, title, text, color, createdAt) VALUES (?, ?, ?, ?, NOW())',
      [note.uuid, note.title, note.text, note.color]
    );

    connection.release();
    return result;
  } catch (error) {
    console.error('Error creating note in the database:', error.message);
    throw error;
  }
}


async function getAllNotesFromDatabase() {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM notes');

    connection.release();
    return rows;
  } catch (error) {
    console.error('Error getting all notes from the database:', error.message);
    throw error;
  }
}

// Add other database-related functions as needed

module.exports = {
  createNoteInDatabase,
  getAllNotesFromDatabase,
};
