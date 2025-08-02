import { Children, createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({children}) => {
    const [notes, setNote] = useState([]);

    const addNote = (note) => {
        setNote(prev => [...prev, note]);
    }

   return <NoteContext.Provider value={{notes, addNote}}>
      {children}
   </NoteContext.Provider>
}