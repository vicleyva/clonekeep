const express = require('express')

const notesController = require('../controllers/notes-controller')
const fileUpload = require('../middleware/file-upload');
const generateChecksum = require('../middleware/file-checksum');

const router = express.Router()

router.get('/', notesController.getNotes);

router.get('/:noteID', notesController.getNoteByID)

router.post('/', notesController.createNote)

router.patch('/:noteID', notesController.updateNoteByID)
router.delete('/:noteID', notesController.deleteNoteByID)

router.post('/:noteID/file',
    fileUpload.single('file'),
    generateChecksum('md5'),
    notesController.createNoteFile);
router.delete('/:noteID/file/:noteFileID', notesController.deleteNoteFile)



router.post('/:noteID/tag', notesController.createNoteTag)
router.delete('/:noteID/tag/:noteTagID', notesController.deleteNoteTag)

router.post('/:noteID/clone', notesController.cloneNoteByID)

module.exports = router;