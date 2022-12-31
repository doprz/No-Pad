import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultProfilePic from '../img/defaultProfilePicture.png'

const SideNav = ( { createNewNote, user, notes, fetchLatestNotes } ) => {

  const { currentUser, logout } = useAuth()
  const [error, setError] = useState('')
  const history = useHistory()

  const [newNoteMenuOpen, setNewNoteMenuOpen] = useState(false)

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      history.push("/")
    } catch {
      setError('Failed to log out')
    }

  }

  const openNewNoteMenu = () => {
    setNewNoteMenuOpen(true)
  }
  const closeNewNoteMenu = () => {
    setNoteName("")
    setNewNoteMenuOpen(false)
  }

  const [noteName, setNoteName] = useState("")
  const [isInputFilled, setIsInputFilled] = useState(false)

  const handleNoteNameChange = (e) => {
    const newNoteName = e.target.value

    setNoteName(newNoteName)
  }

  useEffect(() => {
    if(noteName === "") {
      setIsInputFilled(false)
    } else {
      setIsInputFilled(true)
    }
  }, [noteName, setIsInputFilled])

  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    if(isInputFilled) {
      createNewNote(noteName)

      // insertNewNoteForUser(user, noteName, "")
      // fetchLatestNotes()
      closeNewNoteMenu()
    }
  }, [user, noteName, fetchLatestNotes, isInputFilled])
  
  return(
    <aside className="sidenav">
      <div className="user">
        <img src={currentUser.photoURL ? currentUser.photoURL : defaultProfilePic} alt="User Profile Picture" />
        <div className="user-text">
          <span id="name">{currentUser.displayName ? currentUser.displayName : currentUser.email}</span>
          {/* <span id="email">{currentUser.email}</span> */}
        </div>
      </div>

      <div className="QuickAccess">
        <h1 id="NewNote" onClick={openNewNoteMenu}><span><FontAwesomeIcon id="NewNoteIcon" icon={['fas', 'plus-square']} className="sidenav-icon"/>New Note</span></h1>

        <ul className="QuickAccess_list fa-ul">
          <li><span className="fa-li"><i className=""></i></span><FontAwesomeIcon icon={['fas', 'file-alt']} className="sidenav-icon"/>All Notes</li>
          <li><span className="fa-li"><FontAwesomeIcon icon={['fas', 'caret-right']} className="sidenav-icon"/></span><FontAwesomeIcon icon={['fas', 'star']} className="sidenav-icon"/>Important</li>
          <li><span className="fa-li"><FontAwesomeIcon icon={['fas', 'caret-right']} className="sidenav-icon"/></span><FontAwesomeIcon icon={['fas', 'folder']} className="sidenav-icon"/>Folders</li>
          <li><span className="fa-li"><FontAwesomeIcon icon={['fas', 'caret-right']} className="sidenav-icon"/></span><FontAwesomeIcon icon={['fas', 'user-friends']} className="sidenav-icon"/>Shared with Me</li>
        </ul>
      </div>

      <div className="Workspaces">
        <h2>Workspaces</h2>
        <ul className="Workspaces_list fa-ul">
          <li><span className="fa-li"><i className=""></i></span><FontAwesomeIcon icon={['fas', 'briefcase']} className="sidenav-icon"/>Work</li>
          <li><span className="fa-li"><i className=""></i></span><FontAwesomeIcon icon={['fas', 'chalkboard-teacher']} className="sidenav-icon"/>School</li>
          <li><span className="fa-li"><i className=""></i></span><FontAwesomeIcon icon={['fas', 'user']} className="sidenav-icon"/>Personal</li>
        </ul>
      </div>

      <div className="Misc">
        <ul className="Misc_list fa-ul">
          <li><FontAwesomeIcon icon={['fas', 'trash']} className="sidenav-icon"/>Trash</li>
          <li><FontAwesomeIcon icon={['fas', 'cog']} className="sidenav-icon"/>Settings</li>
        </ul>
      </div>

      <div className="modal" id="newNoteModal" style={newNoteMenuOpen ? {display: "flex"} : {display: "none"}}>
        <div className="modal-content">
          <h1>New Note Setup</h1>

          <form className="newNoteForm">
            <label htmlFor="noteName">Note Name</label>
            <input type="text" id="noteName" name="noteName" value={noteName} onChange={handleNoteNameChange}/>

            <button 
              type="submit"
              onClick={handleButtonClick}
              className={!isInputFilled ? "disabled button_form" : "button_form"}>
              Create Note
            </button>
            <button 
              type="button"
              onClick={closeNewNoteMenu}
              id="cancelNewNote"
              className={"button_form"}>
              Cancel
            </button>
          </form>
        </div>
      </div>

      <div id="logout">
        <h5 onClick={handleLogout}>Log Out</h5>
      </div>

    </aside>
  )

}

export default SideNav;