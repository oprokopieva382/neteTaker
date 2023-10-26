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

//HTML route
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);