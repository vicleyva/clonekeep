const express = require('express')
const path = require('path');
const NotesRoutes = require('./routes/notes-routes')

const app = express()
const port = 5000;

// Parse body 
app.use(express.json())

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Set CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// This will call Notes Routes
// GET    /notes/
// POST   /notes/
// PUT    /notes/
// DELETE /notes/
// We need to register prefix with app.use
app.use('/notes', NotesRoutes)

app.use((req, res, next) => {
    res.status(404)
    res.json({
        message: 'Route not found'
    })
});

// Handle Errors
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})