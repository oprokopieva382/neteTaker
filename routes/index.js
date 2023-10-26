const express = require("express");

// Import  modular router for notes
const notedRouter = require("./notes");

const app = express();

app.use("/notes", notedRouter);


module.exports = app;