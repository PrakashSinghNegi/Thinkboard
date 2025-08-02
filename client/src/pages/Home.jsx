import { useContext } from "react";
import { Link } from "react-router";
import { NoteContext } from "../NoteContext";

function Home() {
    const note = useContext(NoteContext);
    const notes = note.notes;
    console.log(notes)

    function formatDate(id) {
        const date = new Date(id);
        const formatted = date.toLocaleDateString("en-US", {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        return formatted;
    }
    
    return <div className="home-container">

        <h2>Notes App</h2>
        <button><Link to="/create">+ New Note</Link></button>

        <div className="note-container">
            {
               notes.map(note => (
                  <div key={note.id} className="note-item">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <div>
                        <p>{formatDate(note.id)}</p>
                        <button>&#9998;</button>
                        <button>&#128465;</button>
                    </div>
                  </div>
               )) 
            }
        </div>
    </div>
}
export default Home;