const { v4: uuidv4 } = require("uuid");
const { postNewNote, getNotes } = require("./restApi.js");

const saveNote = document.getElementById("save-note");
const newNote = document.getElementById("new-note");
const clearForm = document.getElementById("clear-btn");

const noteTitleInput = document.querySelector(".note-title");
const noteTextarea = document.querySelector(".note-textarea");
const saveNoteButton = document.querySelector(".save-note");
const clearFormButton = document.querySelector(".clear-form");
const newNoteButton = document.querySelector(".new-note");

const listGroup = document.getElementById("list-group");

// Function to fetch and display notes when the page loads
const loadNotesList = async () => {
  try {
    const response = await getNotes();
    const notes = response.data;
    displayNotesList(notes);
  } catch (err) {
    console.error("Error loading notes:", err);
  }
};

// Function to display an existing note in the right-hand column
const displayNote = (note) => {
  noteTitleInput.value = note.title;
  noteTextarea.value = note.text;
  newNoteButton.style.display = "block";
};

// Function to display a list of existing notes on the left-hand column
const displayNotesList = (notes) => {
  listGroup.innerHTML = "";
  const listItems = notes.map((note) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item list-item-title";
    listItem.textContent = note.title;

    listItem.addEventListener("click", () => displayNote(note));
    return listItem;
  });
  listItems.forEach((listItem) => listGroup.appendChild(listItem));
};

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
  if (!noteTitle.value || !noteText.value) {
    alert("Please enter both a title and text for the note.");
    return;
  }
  const newNote = {
    id: uuidv4(),
    title: noteTitleInput.value.trim(),
    text: noteTextarea.value.trim(),
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

loadNotesList();
newNote.addEventListener("click", newNoteHandler);
clearForm.addEventListener("click", clearFormHandler);
saveNote.addEventListener("click", saveNoteHandler);
