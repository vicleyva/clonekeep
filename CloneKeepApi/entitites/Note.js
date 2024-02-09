class Note {
    noteID
    title
    text
    color
    createdAt
    updatedAt

    constructor({ noteID, title, text, color, createdAt, updatedAt }) {
        this.noteID = noteID;
        this.title = title;
        this.text = text;
        this.color = color;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
module.exports = Note;