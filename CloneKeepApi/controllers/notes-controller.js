const uuid = require('uuid');
const fs = require('fs');
const { validationResult } = require('express-validator');
const notesRepository = require('../repositories/notesRepository');

const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newNote = req.body;
        newNote.noteID = uuid.v4();

        const result = await notesRepository.createNoteInDatabase(newNote);

        res.status(201).json({ message: 'Note created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error: error.message, body: req.body });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesRepository.getAllNotesFromDatabase();
        res.status(200).json({ notes });
    } catch (error) {
        res.status(500).json({ message: 'Error getting all notes', error: error.message });
    }
};

const getNoteByID = async (req, res) => {
    try {
        const { noteID } = req.params;
        const note = await notesRepository.getNoteByID(noteID);
        res.status(200).json({ note })
    } catch (error) {
        res.status(500).json({ message: 'Error getting note', error: error.message });
    }
}

const createNoteFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const { noteID } = req.params;
    const fileChecksum = req.file.checksum;

    try {
        // get note from BD
        const note = await notesRepository.getNoteByID(noteID);
        if (!note) {
            throw new Error('Note not found')
        }

        let newFile = {};

        // search checksum in db
        const foundFile = await notesRepository.findFileByChecksum(fileChecksum);
        if (!foundFile) {
            // save file
            newFile = {
                fileID: uuid.v4(),
                name: req.file.filename,
                ext: req.file.filename.split('.').pop(),
                checksum: req.file.checksum,
            };
            await notesRepository.saveFileInDatabase(newFile);
        } else {
            // delete file
            fs.unlink(req.file.path, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting file:', unlinkError.message);
                }
            });
        }
        const note_file = {
            noteFileID: uuid.v4(),
            noteID: note.noteID,
            fileID: (foundFile) ? foundFile.fileID : newFile.fileID
        }
        await notesRepository.associateNoteWithFile(note_file)

        return res.status(201).json({
            noteFileID: note_file.noteFileID,
            fileID: note_file.fileID,
            name: (foundFile) ? foundFile.name : newFile.name
        });
    } catch (error) {
        fs.unlink(req.file.path, (unlinkError) => {
            if (unlinkError) {
                console.error('Error deleting file on error:', unlinkError.message);
            }
        });
        return res.status(404).json({ message: error.message });
    }
};

const createNoteTag = async (req, res) => {
    const { noteID } = req.params;

    try {
        const { text } = req.body

        // get note from BD
        const note = await notesRepository.getNoteByID(noteID)
        if (!note) {
            throw new Error('Note not found')
        }

        let newTag = {};

        // search tag in db
        const foundTag = await notesRepository.findTag(text)
        if (!foundTag) {
            newTag = {
                tagID: uuid.v4(),
                text: text
            }
            await notesRepository.saveTagInDatabase(newTag)
        }

        const note_tag = {
            noteTagID: uuid.v4(),
            noteID: note.noteID,
            tagID: (foundTag) ? foundTag.tagID : newTag.tagID
        }
        await notesRepository.associateNoteWithTag(note_tag)

        return res.status(201).json({
            noteTagID: note_tag.noteTagID,
            tagID: note_tag.tagID,
            text: (foundTag) ? foundTag.text : newTag.text
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

module.exports = {
    createNote,
    getAllNotes,
    createNoteFile,
    createNoteTag,
    getNoteByID
};
