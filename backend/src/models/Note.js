import mongoose from "mongoose";

// create a schema for the notes
// based on the schema we can creaet a model for the notes we
// create and update

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

const Note = mongoose.model("Note", noteSchema);

export default Note;