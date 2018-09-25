class Note {
  constructor(object) {
    this.id = object.id
    this.title = object.title
    this.body = object.body
  }
  render() {
    return `
    <div id="${this.id}" style="padding-left: 10px">
      <h3 onClick="expand()">${this.title}</h3>
      <div class="description">
        <p>${this.body}</p>
        <button onClick="editNote()">Edit</button>
        <button onClick="deleteNote()">Delete</button>
      </div>
    </div>
    `
  }
  editForm() {
    return `
    <div id="${this.id}" class="forms">
      <form id="edit-form">
        <h3>Edit</h3>
        Title: <input id="edit-title" type="text" value="${this.title}"></input>
        Body: <textarea id="edit-body">${this.body}</textarea>
        <input type="submit" value="submit" onClick="sendEdit()">
      </form>
    <div>
    `
  }
}
