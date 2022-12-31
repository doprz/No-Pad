import React, { useEffect, useState, useCallback } from 'react';
import ReactQuill from 'react-quill'
// import debounce from '../helpers'
import { updateNoteForUser } from '../utils/localStorageUtils'

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { TextField } from '@material-ui/core';

import Container from '@material-ui/core/Container';
import CachedIcon from '@material-ui/icons/Cached';

// Load the lodash full build
var _ = require('lodash');

const Note = ( { note, setUpdatedNoteTitle, setUpdatedNote } ) => {

  const [id, setId] = useState('')
  const [noteTitle, setNoteTitle] = useState('')
  // const [text, setText] = useState('')

  const [saving_title, setSaving_title] = useState(false)
  const [saving_note, setSaving_note] = useState(false)

  const [blockReactQuillFIrstAPIChange, setBlockReactQuillFIrstAPIChange] = useState(false)

  const [noteContent, setNoteContent] = useState("")

  useEffect(() => {
    if (note === null) {
      setNoteTitle("")
      setNoteContent("")
    } else {
      setNoteTitle(note[0].title)
      setNoteContent(note[0].body)
      // console.log("Note: " + note[0].body)
    }
  }, [note])

  // useEffect(() => {
  //   // console.log("Note Content: " + noteContent)
  //   // console.log("Note Title: " + noteTitle)
  // }, [noteTitle, noteContent])

  const handleNoteContentChange = (e) => {
    const newNoteContent = e.target.value
    setNoteContent(newNoteContent)
  }

  // Localstorage
  // const updateNote = useCallback((e) => {
  //   e.preventDefault();
  //   updateNoteForUser({ ...note, content: noteContent })
  //   fetchLatestNotes()
  // }, [note, noteContent, fetchLatestNotes])

  // const update = debounce(() => {
  //   // Come back later
  //   console.log("Updating database")
  // }, 1500)

  const RQOnChange = useCallback(_.debounce((content, delta, source, editor) => {

    if (source == "api") {
      // console.log("An API call for React Quill update has been called")
    } else if (source == "user") {
      setNoteContent(editor.getHTML())
      setUpdatedNote(editor.getHTML())
      // console.log("An user action for React Quill update has been called")

      // setSaving_note(false)
    }

    // [BUG]
    // setSaving_note(false)

    // console.log("Note Updated")
    // console.log(editor.getHTML()); // rich text
		// console.log(editor.getText()); // plain text
		// console.log(editor.getLength()); // number of characters
  }, 1000), [])

  const handleRQOnChange = (content, delta, source, editor) => {
    // RQOnChange(content, delta, source, editor)
    // setSaving_note(true)

    RQOnChange(content, delta, source, editor)
    if (source == "user") {
      // [BUG]
      // setSaving_note(true)
    }
    
    // if (source == "api") {
    //   setSaving_note(true)
    // }



    // Block React Quill's first API call
    // if (source == "api" && !blockReactQuillFIrstAPIChange) {
    //   setBlockReactQuillFIrstAPIChange(true)
    //   console.log("Blocked React Quill's first API call")
    // } else {
    //   RQOnChange(content, delta, source, editor)
    //   // setSaving_note(true)
    // }
    
  }

  // const updateBody = async (val) => {
  //   await setText(val)

  //   update()
  // }

  // const updateNoteTitleChange = _.debounce((value) => {
  //   // setNoteTitle(value)
  //   setUpdatedNoteTitle(value)
  //   // console.log(event.target.value)
  // }, 1000)

  // // Controlled component
  // const handleNoteTitleChange = (event) => {
  //   /* signal to React not to nullify the event object */
  //   // https://medium.com/@anuhosad/debouncing-events-with-react-b8c405c33273
  //   // event.persist()

  //   let value = event.target.value
  //   setNoteTitle(value)
  //   // setUpdatedNoteTitle(value)
  //   updateNoteTitleChange(value)

  // }

  // https://rajeshnaroth.medium.com/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
  const updateNoteTitleChange = useCallback(_.debounce((value) => {
    setUpdatedNoteTitle(value)
    setSaving_title(false)
  }, 1000), [])

  // Controlled component
  const handleNoteTitleChange = (event) => {
    setNoteTitle(event.target.value)
    updateNoteTitleChange(event.target.value)
    setSaving_title(true)
  }

  const RQModules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ]
  };

  const RQModules_Adv = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]
  };

  const RQFormats = [
    'font',
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'color', 'background'
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      // width: 400,
    },
    input: {
      marginLeft: theme.spacing(0),
      flex: 1,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  const classes = useStyles()

  return(
    <div className="noteEditorContainer">
      {/* <h2>{(note !== null) ? note.title : ""}</h2>
      {(note !== null) ? <textarea value={noteContent} onChange={handleNoteContentChange}></textarea> : ""}
      {(note !== null) ? <button type="submit" onClick={updateNote} className="button_form">Submit</button> : ""} */}

      {/* <InputBase
        className={classes.input}
        fullWidth={true}
        defaultValue={noteTitle}
        inputProps={{ 'aria-label': "note title" }}
        // placeholder="Title"
      /> */}

      <Container className={classes.root}>

        <InputBase
          id="noteTitleInput"
          fullWidth={true}
          value={noteTitle}
          placeholder="Note Title"
          onChange={handleNoteTitleChange}>
        </InputBase>

        {/* <Divider className={classes.divider} orientation="vertical" /> */}

        {(saving_title || saving_note) && (
          <>
            <CachedIcon color="disabled" fontSize="small" />
            <p style={{color: "#00000042"}}>Saving...</p>
          </>
        )}

      </Container>


      <ReactQuill
        modules={RQModules}
        // formats={RQFormats}
        value={noteContent}
        // onChange={RQOnChange}>
        onChange={handleRQOnChange}>
      </ReactQuill>

    </div>
  )
  
}

export default Note;