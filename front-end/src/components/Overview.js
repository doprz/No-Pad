import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NoteObj from './NoteObj'

const Overview = ( { user, notes, note, setNote, fetchLatestNotes } ) => {

  return(
    <div className="Overview">

      <div className="selected">
        <div className="menu-icon active"><FontAwesomeIcon icon={['fas', 'bars']} /></div>
        <h2>All Notes</h2>
      </div>

      {notes.map((l_note, index) => {
        return <NoteObj key={`note-object-${index}`} note={l_note} setNote={setNote} fetchLatestNotes={fetchLatestNotes}/>
        // console.log(`note-object-${index}`)
      })}

    </div>
  )
  
}

export default Overview;