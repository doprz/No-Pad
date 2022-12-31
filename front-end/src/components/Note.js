import React, { useEffect, useState, useCallback } from 'react';

import { 
  updateNoteForUser
} from '../utils/localStorageUtils'

const Note = ( {user, note, fetchLatestNotes } ) => {

  const [noteContent, setNoteContent] = useState("")

  useEffect(() => {
    note !== null && setNoteContent(note.content)
  }, [note])

  const handleNoteContentChange = (e) => {
    const newNoteContent = e.target.value
    setNoteContent(newNoteContent)
  }

  const updateNote = useCallback((e) => {
    e.preventDefault();
    updateNoteForUser({ ...note, content: noteContent })
    fetchLatestNotes()
  }, [note, noteContent, fetchLatestNotes])

  return(
    <div className="Note">
      <h2>{(note !== null) ? note.title : ""}</h2>
      {(note !== null) ? <textarea value={noteContent} onChange={handleNoteContentChange}></textarea> : ""}
      {(note !== null) ? <button type="submit" onClick={updateNote} className="button_form">Submit</button> : ""}
    </div>
  )
  
}

export default Note;