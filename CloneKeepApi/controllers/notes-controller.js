const uuid = require('uuid');
const { validationResult } = require('express-validator');
const notesRepository = require('../repositories/notesRepository');

const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newNote = req.body;
        newNote.uuid = uuid.v4();

        const result = await notesRepository.createNoteInDatabase(newNote);

        res.status(201).json({ message: 'Note created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error: error.message, body: req.body });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesRepository.getAllNotesFromDatabase();
        res.status(200).json({ message: 'All notes retrieved successfully', notes });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all notes', error: error.message });
    }
};

module.exports = {
    createNote,
    getAllNotes
};
