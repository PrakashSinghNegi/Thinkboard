import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router'
import { createRoot } from 'react-dom/client'
import { NoteProvider } from './NoteContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NoteProvider>
        <App />
      </NoteProvider>
    </BrowserRouter>
  </StrictMode>,
)
