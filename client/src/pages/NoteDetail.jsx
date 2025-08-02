function NoteDetail() {

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

export default NoteDetail;