import { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetail = () => {

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("error in notedetail page", error);
                toast.error("Failed to fetch note")
            }finally {
                setLoading(false)
            }
        }

        fetchNote()
    }, [id])

    const handleSaving = async () => {
        if(!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content")
            return;
        }

        setSaving(true);

        try {
            await api.put(`/notes/${id}`, note)
            toast.success('Note updated');
            navigate("/");
        } catch (error) {
            console.log("error in notedetail", error);
            toast.error("failed to update note")
        }finally {
            setSaving(false)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault(); // prevent default navigation behaviour

        if(!window.confirm("Are you sure, you want to delete the note")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("note deleted");
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error("failed to delete the note");
        }
  } 

    if(loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10"></LoaderIcon>
            </div>
        )
    }
    
    return <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
               <div className="flex flex-center justify-between mb-6">
                <Link to={"/"} className="btn btn-ghost mb-6">
                    <ArrowLeftIcon className="size-5"></ArrowLeftIcon>
                    Back to Notes
                </Link>
                <button className='btn btn-error btn-outline' onClick={(e) => handleDelete(e, note._id)}>
                     <Trash2Icon className='h-5 w-5'></Trash2Icon>
                     Delete Note
                </button>
               </div>

               <div className="card bg-base-100">
                   <div className="card-body">
                      <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" 
                        placeholder="Note Title"
                        className="input input-bordered"
                        value={note.title}
                        onChange={(e) => setNote({...note, title: e.target.value})}/>
                      </div>

                      <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <textarea type="text" 
                        placeholder="Write your note here..."
                        className="textarea textarea-bordered"
                        value={note.content}
                        onChange={(e) => setContent({...note, content: e.target.value})}/>

                    </div>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" disabled={saving} onClick={handleSaving}>
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                   </div>
               </div>
            </div>
            

        </div>
    </div>
}

export default NoteDetail;