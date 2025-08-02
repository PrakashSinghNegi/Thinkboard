import { useState } from 'react'
import {Routes, Route} from 'react-router'
import Home from './pages/Home.jsx' 
import CreateNote from './pages/CreateNote.jsx' 
import NoteDetail from './pages/NoteDetail.jsx' 
import './App.css'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/create' element={<CreateNote></CreateNote>}></Route>
      <Route path='/note/:id' element={<NoteDetail></NoteDetail>}></Route>
    </Routes>
  )
}

export default App
