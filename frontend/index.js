function expand() {
  let current = event.target.parentNode.children[1]
  if (current.style.display == "none") {
    current.style.display = "block"
  } else {
    current.style.display = "none"
  }
}

function editNote() {
  const note = event.target.parentElement.parentElement
  const userContainer = document.getElementById("user-container")
  const noteObj = users[0].notes.find(usernote => usernote.id == note.id)
  console.log(noteObj)
  event.target.disabled = true
  userContainer.innerHTML += noteObj.editForm()
}

function sendEdit() {
  event.preventDefault()
  user = users[0]
  const noteId = event.target.parentElement.parentElement.id
  const newTitle = document.querySelector("#edit-title").value
  const newBody = document.querySelector("#edit-body").value
  fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: newTitle,
      body: newBody,
      user_id: user.id,
      id: noteId
    })
  })
  event.target.parentElement.parentElement.remove()
  const noteToEdit = document.getElementById(noteId)
  noteToEdit.children[0].innerText = newTitle
  noteToEdit.children[1].children[0].innerText = newBody
  noteToEdit.children[1].children[1].disabled = false

}

function deleteNote() {
  const note = event.target.parentElement.parentElement
  note.remove()
  fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
    method: "DELETE",
  })
}
document.addEventListener('DOMContentLoaded',function() {

  fetch("http://localhost:3000/api/v1/users")
  .then(response => response.json())
  .then(function (data) {
    const user = new User(data[0])
    const notes = user.notes.map(function (noteData) {
      return new Note(noteData)
    })
    user.notes = notes
    return user
  }).then( function (user) {
    const userName = document.querySelector("#user-container h3")
    const notesContainer = document.getElementById("notes-container")
    userName.innerHTML = user.render()
    user.notes.forEach(function (note) {
      notesContainer.innerHTML += note.render()
    })

    const form = document.querySelector("#form-container")
    form.addEventListener('submit', function(){
      event.preventDefault();
      const newTitle = document.querySelector("#note-title").value
      const newBody = document.querySelector("#note-body").value
      fetch("http://localhost:3000/api/v1/notes", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          body: newBody,
          user_id: user.id
        })
      }).then(response => response.json()).then(function (noteData) {
        const newNote = new Note(noteData)
        notesContainer.innerHTML += newNote.render()
      })
    })

  })





















})
