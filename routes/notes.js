const notes = require("express").Router();
const fs = require("fs");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET for read notes from db.json
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST a new note to db.json
notes.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      topic,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/tips.json");
    res.json(`New note added successfully`);
  } else {
    res.error("Error in adding tip");
  }
});

// Delete note by id from db.json
notes.delete("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const notesData = await readFromFile("./db/db.json").then((data) =>
      res.json(JSON.parse(data))
    );
    const index = notesData.findIndex((note) => note.id === id);
    if (index !== -1) {
      notesData.splice(index, 1);
      await fs.writeToFile(path.join(__dirname, ".db/db.json"), notesData);

      res.status(200).send();
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = notes;
