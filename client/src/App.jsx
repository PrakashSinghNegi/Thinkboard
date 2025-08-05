import { useState } from 'react'
import {Routes, Route} from 'react-router'
import Home from './pages/Home.jsx' 
import CreateNote from './pages/CreateNote.jsx' 
import NoteDetail from './pages/NoteDetail.jsx' 
import toast from 'react-hot-toast'
import './App.css'

function App() {


  return (
    <div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-5
      [background: radial-gradient(125%_125%_at_50%_10%,#000_60%,
      #00FF9D40_100%)]'></div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/create' element={<CreateNote></CreateNote>}></Route>
        <Route path='/note/:id' element={<NoteDetail></NoteDetail>}></Route>
      </Routes>
    </div>
    
  )
}

export default App
