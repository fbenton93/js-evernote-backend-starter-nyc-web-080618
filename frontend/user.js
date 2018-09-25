let users = []
class User {
  constructor(object) {
    this.id = object.id
    this.name = object.name
    this.notes = object.notes
    users.push(this)
  }
  render() {
    return `${this.name}`
  }
}
