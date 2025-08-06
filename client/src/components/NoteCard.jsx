
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import {formatDate} from '../lib/utils.js'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // prevent default navigation behaviour

    if(!window.confirm("Are you sure, you want to delete the note")) return;

    try {
        await api.delete(`/notes/${id}`);
        toast.success("note deleted successfully");
        setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
        console.log(error);
        toast.error("failed to delet the note");
    }
  } 

  return (
    <Link 
       to={`/note/${note._id}`}
       className='card bg-base-100 hover:shadow-lg transition-all duration-200
        border-t-4 border-solid border-[#00FF9D]'
    >
        <div className="card-body">
            <h2 className="card-title text-base-content">
                {note.title}
            </h2>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className='text-sm text-base-content/60'>
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'></PenSquareIcon>
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className='size-4'></Trash2Icon>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard