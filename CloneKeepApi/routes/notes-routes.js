const express = require('express')
const { check } = require('express-validator')

const notesController = require('../controllers/notes-controller')
const fileUpload = require('../middleware/file-upload');
const generateChecksum = require('../middleware/file-checksum');

const router = express.Router()

router.get('/', notesController.getAllNotes);

router.get('/:noteID', notesController.getNoteByID)

router.post('/', notesController.createNote)

router.post('/:noteID/file',
    fileUpload.single('file'),
    generateChecksum('md5'),
    notesController.createNoteFile);

router.post('/:noteID/tag', notesController.createNoteTag)

module.exports = router;