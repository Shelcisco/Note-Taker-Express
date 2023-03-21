const fs = require("fs");
const path = require('path')
const Route = require('express').Router()

// Get all notes
Route.get("/api/notes", (req, res) => {
  const data = fs.readFileSync("db/db.json");
  console.log(data)
  const notes = JSON.parse(data);
  res.json(notes);
});

// Save a new note
Route.post("/api/notes", (req, res) => {
  const data = fs.readFileSync("db/db.json");
  const notes = JSON.parse(data);
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    text: req.body.text
  };
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(newNote);
});

module.exports = Route
