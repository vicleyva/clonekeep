const mysql = require('mysql2/promise');
const Note = require('../entitites/Note');
const NoteDto = require('../dtos/NoteDto')
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
      'INSERT INTO notes (noteID, title, text, color, createdAt) VALUES (?, ?, ?, ?, NOW())',
      [note.noteID, note.title, note.text, note.color]
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

    const [rows] = await connection.query(`SELECT * 
    FROM notes
    ORDER BY createdAt`);
    const notes = rows.map(row => new Note(row))

    const response = Promise.all(notes.map(async note => {
      // get files array
      const files = await getNoteFiles(note.noteID)

      // get tags array
      const tags = await getNoteTags(note.noteID)

      return new NoteDto(note, files, tags)
    }))

    connection.release();
    return response;
  } catch (error) {
    console.error('Error getting all notes from the database:', error.message);
    throw error;
  }
}

async function getNoteByID(noteID) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM notes WHERE noteID = ?', [noteID]);

    connection.release();

    if (rows.length === 0) {
      return null; // Return null if no note found for the given ID
    } else {
      const note = new Note(rows[0])
      // get files array
      const files = await getNoteFiles(note.noteID)

      // get tags array
      const tags = await getNoteTags(note.noteID)

      const response = new NoteDto(note, files, tags)
      return response
    }
  } catch (error) {
    console.error('Error getting note by ID from the database:', error.message);
    throw error;
  }
}

async function getNoteFiles(noteID) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query(`SELECT t2.noteFileID,t3.name
    FROM notes t1
    JOIN notes_files t2 USING (noteID)
    JOIN files t3 USING (fileID) 
    WHERE t1.noteID = ?`, [noteID]);
    connection.release();

    if (rows.length === 0) {
      return [];
    }
    return rows;
  } catch (error) {
    console.error('Error getting note files from the database:', error.message);
    throw error;
  }
}

async function deleteNote(noteID) {
  try {
    const connection = await pool.getConnection();

    // Delete associated files
    await deleteNoteFiles(noteID)

    // Delete associated tags
    await deleteNoteTags(noteID)

    // Delete the note
    const [result] = await connection.query('DELETE FROM notes WHERE noteID = ?', [noteID]);

    connection.release();
    return result;
  } catch (error) {
    console.error('Error deleting note and associated records from the database:', error.message);
    throw error;
  }
}

async function deleteNoteTags(noteID) {
  try {
    const connection = await pool.getConnection();

    // Delete associations
    await connection.query('DELETE FROM notes_tags WHERE noteID = ?', [noteID]);

    connection.release();
    return true;
  } catch (error) {
    console.error('Error deleting associated note tags from the database:', error.message);
    throw error;
  }
}

async function deleteNoteFiles(noteID) {
  try {
    const connection = await pool.getConnection();

    // Delete associations
    await connection.query('DELETE FROM notes_files WHERE noteID = ?', [noteID]);

    connection.release();
    return true;
  } catch (error) {
    console.error('Error deleting associated note files from the database:', error.message);
    throw error;
  }
}

async function saveFileInDatabase(file) {
  try {
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'INSERT INTO files (fileID, name, ext, checksum, createdAt) VALUES (?, ?, ?, ?, NOW())',
      [file.fileID, file.name, file.ext, file.checksum]
    );

    connection.release();
    return result;
  } catch (error) {
    console.error('Error saving file in the database:', error.message);
    throw error;
  }
}

async function associateNoteWithFile(note_file) {
  try {
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'INSERT INTO notes_files (noteFileID, noteID, fileID, createdAt) VALUES (?, ?, ?, NOW())',
      [note_file.noteFileID, note_file.noteID, note_file.fileID]
    );

    connection.release();
    return result;
  } catch (error) {
    console.error('Error associating note with file in the database:', error.message);
    throw error;
  }
}

async function findFileByChecksum(checksum) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT fileID, name, ext, checksum FROM files WHERE checksum = ?', [checksum]);

    connection.release();
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  } catch (error) {
    console.error('Error finding file by checksum in the database:', error.message);
    throw error;
  }
}

async function findFileByName(fileName) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT fileID, name, ext, checksum FROM files WHERE name = ?', [fileName]);

    connection.release();
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  } catch (error) {
    console.error('Error finding file by name in the database:', error.message);
    throw error;
  }
}

async function getNoteTags(noteID) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query(`SELECT t2.noteTagID,t3.text
    FROM notes t1
    JOIN notes_tags t2 USING (noteID)
    JOIN tags t3 USING (tagId) 
    WHERE t1.noteID = ?`, [noteID]);
    connection.release();

    if (rows.length === 0) {
      return [];
    }
    return rows;
  } catch (error) {
    console.error('Error getting note tags from the database:', error.message);
    throw error;
  }
}

async function saveTagInDatabase(tag) {
  try {
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'INSERT INTO tags (tagID, text, createdAt) VALUES (?, ?, NOW())',
      [tag.tagID, tag.text]
    );

    connection.release();
    return result;
  } catch (error) {
    console.error('Error saving tag in the database:', error.message);
    throw error;
  }
}

async function associateNoteWithTag(note_tag) {
  try {
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'INSERT INTO notes_tags (noteTagID, noteID, tagID, createdAt) VALUES (?, ?, ?, NOW())',
      [note_tag.noteTagID, note_tag.noteID, note_tag.tagID]
    );

    connection.release();
    return result;
  } catch (error) {
    console.error('Error associating note with tag in the database:', error.message);
    throw error;
  }
}

async function findTag(text) {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT tagID, text FROM tags WHERE text = ?', [text]);

    connection.release();
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  } catch (error) {
    console.error('Error finding tag in the database:', error.message);
    throw error;
  }
}

module.exports = {
  createNoteInDatabase,
  getAllNotesFromDatabase,
  getNoteByID,
  saveFileInDatabase,
  associateNoteWithFile,
  findFileByChecksum,
  saveTagInDatabase,
  getNoteTags,
  associateNoteWithTag,
  findTag,
  deleteNote,
  findFileByName
};

