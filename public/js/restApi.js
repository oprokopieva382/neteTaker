const axios = require("axios");

const postNewNote = (newNote) => {
  return axios.post("/api/notes", newNote);
};

const getNotes = () => {
  return axios.get("/api/notes");
};

module.exports = { postNewNote, getNotes };