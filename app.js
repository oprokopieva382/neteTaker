const express = require("express");
const path = require("path");
const notesData = require("./db/db.json");

//instance of Express.js
const app = express();
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static("public"));

//html routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// read notes from db.json
app.get("/api/notes", (req, res) => res.json(notesData));

// Add a new note to db.json

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);