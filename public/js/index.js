const saveNote = document.getElementById("save-note");
const newNote = document.getElementById("new-note");
const clearForm = document.getElementById("clear-btn");

const noteTitleInput = document.querySelector(".note-title");
const noteTextarea = document.querySelector(".note-textarea");
const saveNoteButton = document.querySelector(".save-note");
const clearFormButton = document.querySelector(".clear-form");
const newNoteButton = document.querySelector(".new-note");

const newNoteHandler = ()=> {
 noteTitleInput.value = "";
 noteTextarea.value = "";
 saveNoteButton.style.display = "block";
 clearFormButton.style.display = "block";
 newNoteButton.style.display = "none";
}

const clearFormHandler = ()=> {
    
}



newNote.addEventListener("click", newNoteHandler)
clearForm.addEventListener("click", clearFormHandler)