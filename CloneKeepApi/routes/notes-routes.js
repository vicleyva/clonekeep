const express = require('express')
const { check } = require('express-validator')

const notesController = require('../controllers/notes-controller')

const router = express.Router()

router.get('/', notesController.getAllNotes);

router.post('/',
    [check(['title', 'text']).custom((value, { req }) => {
        if (!value && !req.body.text) {
            throw new Error('Either title or text should be provided');
        }
        return true;
    }),],
    notesController.createNote)

module.exports = router;