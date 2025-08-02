import Note from "../models/Note.js"

export async function getAllNote(_, res) {
    try {
       const note = await Note.find().sort({createdAt: -1}); //newest first
       res.status(200).json(note);
    }catch(error) {
        console.error("error in getallnotes", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getNoteById(req, res) {
    try {
       const note = await Note.findById(req.params.id);
       if(!note) return res.status(404).json({message: "Note not found"});
       res.status(200).json(note);
    }catch(error) {
        console.error("error in getallnotes", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function createNote(req, res) {
   try {
       const {title, content} = req.body;
       const note  = new Note({title: title, content: content});
        
       const savedNote =  await note.save();
       res.status(201).json(savedNote);
   } catch (error) {
        console.error("error in createnotes", error);
        res.status(500).json({message: "Internal server error"});
   }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content},
            {
                new: true
            }
        )

        if(!updateNote) return res.status(404).json({message: "Note not found"})

        res.status(200).json(updateNote);
    } catch (error) {
        console.error("error in updateNote", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function deleteNote(req, res) {

    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json(deleteNote);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
    
}