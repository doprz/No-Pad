import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeHTMLTags } from '../helpers'
import { deleteNoteForUser } from '../utils/localStorageUtils'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const NoteObj = ({ note, selectedNoteId, selectNote, deleteNote }) => {

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (e) => {
    // https://stackoverflow.com/questions/2385113/howto-div-with-onclick-inside-another-div-with-onclick-javascript
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteNote = () => {
    handleClose()
    deleteNote(note.id)
  }

  return(
    <div className="NoteObj-container">
      <div className="NoteObj" onClick={() => {selectNote(note.id)}}>
        <h2>{note.title}</h2>
        <p>{removeHTMLTags(note.body.substring(0, 20)) + "..."}</p>
        {/* <h6>{note.id}</h6> */}
        {/* <h6>{note.lastModified}</h6> */}
      </div>
      <div className="NoteObjInfo" onClick={handleClickOpen}>
        <FontAwesomeIcon icon={['fas', 'trash']} className="sidenav-icon"/>
        {/* <span>•</span>
        <span>•</span>
        <span>•</span> */}
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Delete Note"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete the note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDeleteNote} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default NoteObj;

