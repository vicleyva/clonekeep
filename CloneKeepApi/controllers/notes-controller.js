const uuid = require('uuid');
const fs = require('fs');
const notesRepository = require('../repositories/notesRepository');

const createNote = async (req, res) => {
    try {
        const newNote = req.body;
        newNote.noteID = uuid.v4();

        await notesRepository.createNoteInDatabase(newNote);


        res.status(201).json({ message: 'Note cloned', noteID: newNote.noteID });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error: error.message, body: req.body });
    }
};

const getAllNotes = async (req, res) => {
    // await sleep(6000);
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
        res.status(200).json({ ...note })
    } catch (error) {
        res.status(500).json({ message: 'Error getting note', error: error.message });
    }
}

const deleteNoteByID = async (req, res) => {
    try {
        const { noteID } = req.params;

        // get note from BD
        const note = await notesRepository.getNoteByID(noteID);
        if (!note) {
            throw new Error('Note not found')
        }

        await notesRepository.deleteNote(note.noteID);
        res.status(200).json({ message: 'Note deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error: error.message });
    }
}

const cloneNoteByID = async (req, res) => {
    try {
        const { noteID } = req.params;

        // get note from BD
        const note = await notesRepository.getNoteByID(noteID);
        if (!note) {
            throw new Error('Note not found')
        }

        const newNote = {
            noteID: uuid.v4(),
            title: note.title,
            text: note.text,
            color: note.color,
        }
        await notesRepository.createNoteInDatabase(newNote);

        // CLONE FILES
        if (note.files.length) {
            await Promise.all(
                note.files.map(async file => {
                    const fileInfo = await notesRepository.findFileByName(file.name);
                    const note_file = {
                        noteFileID: uuid.v4(),
                        noteID: newNote.noteID,
                        fileID: fileInfo.fileID
                    }
                    await notesRepository.associateNoteWithFile(note_file)
                })
            )
        }
        if (note.tags.length) {
            await Promise.all(
                note.tags.map(async tag => {
                    const tagInfo = await notesRepository.findTag(tag.text);
                    const note_tag = {
                        noteTagID: uuid.v4(),
                        noteID: newNote.noteID,
                        tagID: tagInfo.tagID
                    }
                    await notesRepository.associateNoteWithTag(note_tag)
                })
            )
        }
        res.status(201).json({ message: 'Note cloned' })
    } catch (error) {
        res.status(500).json({ message: 'Error cloning note', error: error.message });
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

        return res.status(201).json({ message: 'Note file created' });
    } catch (error) {
        fs.unlink(req.file.path, (unlinkError) => {
            if (unlinkError) {
                console.error('Error deleting file on error:', unlinkError.message);
            }
        });
        return res.status(404).json({ message: 'Error creating note file', error: error.message });
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

        return res.status(201).json({ message: 'Note tag created' });
    } catch (error) {
        return res.status(404).json({ message: 'Error creating note tag', error: error.message });
    }
}

const deleteNoteTag = async (req, res) => {
    const { noteID, noteTagID } = req.params;
    try {
        // get note from BD
        const note = await notesRepository.getNoteByID(noteID);
        if (!note) {
            throw new Error('Note not found')
        }

        const foundNoteTag = await notesRepository.findNoteTag(noteTagID)
        if (!foundNoteTag) {
            throw new Error('Note tag not found')
        }

        await notesRepository.deleteNoteTag(noteTagID)
        res.status(200).json({ message: 'Note tag deleted' })
    } catch (error) {
        return res.status(404).json({ message: 'Error deleting note tag', error: error.message });
    }
}

module.exports = {
    createNote,
    getAllNotes,
    createNoteFile,
    createNoteTag,
    getNoteByID,
    deleteNoteByID,
    cloneNoteByID,
    deleteNoteTag
};
