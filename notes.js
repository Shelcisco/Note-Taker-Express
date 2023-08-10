const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Route = require('express').Router();

// Get all notes
Route.get("/api/notes", (req, res) => {
  const data = fs.readFileSync("db/db.json");
  const notes = JSON.parse(data);
  res.json(notes);
});

// Save a new note
Route.post("/api/notes", (req, res) => {
  const data = fs.readFileSync("db/db.json");
  const notes = JSON.parse(data);
  const newNote = {
    id: uuidv4(),  // Use uuid to generate a unique ID
    title: req.body.title,
    text: req.body.text
  };
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(newNote);
});

// Delete a note by ID
Route.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const data = fs.readFileSync("db/db.json");
  const notes = JSON.parse(data);
  const newNotes = notes.filter(note => note.id !== noteId);

  if (notes.length !== newNotes.length) {
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.json({message: 'Note deleted successfully.'});
  } else {
    res.status(404).json({message: 'Note not found.'});
  }
});

module.exports = Route;


