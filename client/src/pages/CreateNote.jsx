import { useState } from "react";
import { useContext } from "react";
import { NoteContext } from "../NoteContext";
import { useNavigate } from 'react-router';
import { Link } from "react-router";

function CreateNote() {
    
    const note = useContext(NoteContext);
    const [newNote, setNewNote] = useState({title: "", content: ""});
    const navigate = useNavigate();
    
    function handleChange(e) {
        const {name, value} = e.target;
        setNewNote(prev => ({
            ...prev,
            [name]: value,
        }))
    } 

    function handleSubmit(e) {
        e.preventDefault();
        note.addNote({...newNote, id: Date.now()});
        setNewNote({
            title: "",
            content: ""
        })   
        navigate('/');   
    }

    return <div className="notes-container">
        <div><Link to="/">&#8592;Back to notes</Link></div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" 
            name="title"
            placeholder="Note Title"
            value={newNote.title}
            onChange={handleChange}
            required/>

            <label htmlFor="content">Content</label>
            <textarea name="content"
             rows={8}
             value={newNote.content}
             onChange={handleChange}
             required></textarea>

             <button type="submit">Create Note</button>
        </form>
    </div>
}

export default CreateNote;