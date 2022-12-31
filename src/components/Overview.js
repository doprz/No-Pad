import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NoteObj from './NoteObj'

const Overview = ( { notes, selectedNoteId, selectNote, deleteNote } ) => {

  return(
    <div className="Overview">

      <div className="selected">
        <div className="menu-icon active"><FontAwesomeIcon icon={['fas', 'bars']} /></div>
        <h2>All Notes</h2>
      </div>

      {notes.map((l_note, index) => {
        return <NoteObj key={`note-object-${index}`} note={l_note} selectedNoteId={selectedNoteId} selectNote={selectNote} deleteNote={deleteNote}/>
        // console.log(`note-object-${index}`)
      })}

    </div>
  )
  
}

export default Overview;