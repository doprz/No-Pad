import React, { useState } from 'react';
import SideNav from './SideNav';
import Note from './Note';
import Overview from './Overview';
// import '../manage';
import '../style/style-dashboard.css';
import { getAllNotesForUser } from '../utils/localStorageUtils';

const Dashboard = ( { user } ) => {

  const [notes, setNotes] = useState(getAllNotesForUser(user))
  const [note, setNote] = useState(null)

  const fetchLatestNotes = () => setNotes(getAllNotesForUser(user))

  // Removed <body> since there is already a body in the root HTML document
  return(
    <>
      <SideNav className='sidenav' user={user} notes={notes} fetchLatestNotes={fetchLatestNotes}/>
      <div className='grid-container'>
        <Overview className='Overview' user={user} notes={notes} note={note} setNote={setNote} fetchLatestNotes={fetchLatestNotes}/>
        <Note className='Note' user={user} note={note} fetchLatestNotes={fetchLatestNotes}/>
      </div>
    </>
  )
  
}

export default Dashboard;