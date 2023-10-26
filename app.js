const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");

//instance of Express.js
const app = express();
const PORT = process.env.port || 3001;
app.use(clog);

// Static middleware pointing to the public folder
app.use(express.static("public"));

// Middleware for parsing JSON in request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

//HTML route
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Read notes from db.json
// app.get("/api/notes", (req, res) => {
//   console.info(`GET /api/notes`);
//   res.status(200).json(notesData);
// });

// Add a new note to db.json
// app.post("/api/notes", (req, res) => {
//   const newNote = req.body;
//   newNote.id = uuidv4();
//   notesData.unshift(newNote);

//   fs.writeFileSync(
//     path.join(__dirname, "db/db.json"),
//     JSON.stringify(notesData, null, 2)
//   );

//   res.json(newNote);
// });

// Delete note by id from db.json
// app.delete("/api/notes/:id", (req, res) => {
//   let id = req.params.id;
//   let updatedNotes = notesData.filter((note) => note.id !== id);

//   if (updatedNotes.length < notesData.length) {
//     notesData = updatedNotes;

//     fs.writeFileSync(
//       path.join(__dirname, "db/db.json"),
//       JSON.stringify(notesData, null, 2)
//     );
//     res.status(200).send();
//   } else {
//     res.status(404).json({ message: "Note not found" });
//   }
// });

//HTML route
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);