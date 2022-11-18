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
module.exports = router