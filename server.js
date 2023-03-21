const express = require("express");
const path = require('path');
const fs = require('fs');
const Route =require('./notes.js')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// get route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.use(Route)

  
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

  