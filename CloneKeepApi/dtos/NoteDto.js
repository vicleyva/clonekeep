class NoteDto {
    noteID
    title
    text
    color
    files
    tags
    constructor({ noteID, title, text, color }, files, tags) {
        this.noteID = noteID;
        this.title = title;
        this.text = text;
        this.color = color;
        this.files = files;
        this.tags = tags;
    }
}
module.exports = NoteDto;