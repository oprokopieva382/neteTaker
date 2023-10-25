const { v4: uuidv4 } = require("uuid");
const { postNewNote } = require("./restApi.js");

const saveNote = document.getElementById("save-note");
const newNote = document.getElementById("new-note");
const clearForm = document.getElementById("clear-btn");

const noteTitleInput = document.querySelector(".note-title");
const noteTextarea = document.querySelector(".note-textarea");
const saveNoteButton = document.querySelector(".save-note");
const clearFormButton = document.querySelector(".clear-form");
const newNoteButton = document.querySelector(".new-note");

// Function to handle clicking the "New Note" button
const newNoteHandler = () => {
  noteTitleInput.value = "";
  noteTextarea.value = "";
  saveNoteButton.style.display = "block";
  clearFormButton.style.display = "block";
  newNoteButton.style.display = "none";
};

// Function to handle clicking the "Clear Form" button
const clearFormHandler = () => {
  noteTitleInput.value = "";
  noteTextarea.value = "";
};

// Function to handle clicking the "Save Note" button
const saveNoteHandler = async () => {
  const newNote = {
    id: uuidv4(),
    title: noteTitleInput.value,
    text: noteTextarea.value,
  };

  try {
    const response = await postNewNote(newNote);
    console.log("New note created:", response.data);
    noteTitleInput.value = "";
    noteTextarea.value = "";
  } catch (err) {
    console.error(err);
  }
};

newNote.addEventListener("click", newNoteHandler);
clearForm.addEventListener("click", clearFormHandler);
saveNote.addEventListener("click", saveNoteHandler);
