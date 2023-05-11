const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Get All The Notes using GET call "app/notes/getAllNotes" Login is required 

router.get('/getAllNotes', fetchUser, async (req, res) => {
    console.log(req.user.id, '-------------')
    try {
        const note = await Notes.find({ user: req.user.id })
        console.log(note)
        res.json(note);

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error!")
    }
});

// Add new note using POST call "app/notes/addNotes" Login is required 

router.post('/addNotes', fetchUser, [
    body('title', 'Title must be 5 characters').trim().isLength({ min: 5 }),
    body('description', 'Enter a description with 5 characters').trim().isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;

        const note = new Notes({
            title, description, tag, user: req.user.id
        });

        const savedNotes = await note.save();
        res.json(savedNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error !')
    }

});

// Update note using PUT call "app/notes/updateNotes" Login is required 

router.put('/updateNotes/:id', fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;
    let newNotes = {};

    if (title) newNotes.title = title;
    if (description) newNotes.description = description;
    if (tag) newNotes.tag = tag;

    // Find the note and update it...

    let note = await Notes.findById(req.params.id);

    if (!note) res.status(404).send('Note Not Found!');
    if (note.user.toString() !== req.user.id) {
        return req.status(401).send('Unauthorised Access!')
    }

    note = await Notes.findByIdAndUpdate(req.params.id, newNotes);

    res.send(note);
});


// Delete note using Delete call "app/notes/deleteNote" Login is required 

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    try {
        // Find the note and delete it...

        let note = await Notes.findById(req.params.id);
        if (!note) res.status(404).send('Note Not Found!');

        // Checks if the user has access to delete the note
        if (note.user.toString() !== req.user.id) {
            return req.status(401).send('Unauthorised Access!')
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.send({ note: note, Success: 'The note has been deleted!' });
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error!')
    }
});
module.exports = router;