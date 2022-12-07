const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const Notes = Note.getAllNotes();
      res.send(Notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

.put('/edit', async (req, res) => {
    try {
      let note = await Note.editNote(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      Note.deleteNote(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

module.exports = router
