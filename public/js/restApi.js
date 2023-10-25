const axios = require("axios");

const postNewNote = (newNote) => {
  axios.post("/api/notes", newNote);
};

module.exports = { postNewNote };