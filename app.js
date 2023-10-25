const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const notesData = require("./db/db.json");

//instance of Express.js
const app = express();
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static("public"));

// Middleware for parsing JSON in request body
app.use(express.json());

//HTML routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// Read notes from db.json
app.get("/api/notes", (req, res) => res.json(notesData));

// Add a new note to db.json
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  notesData.unshift(newNote);

  fs.writeFileSync(
    path.join(__dirname, "db/db.json"),
    JSON.stringify(notesData, null, 2)
  );

  res.json(newNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
