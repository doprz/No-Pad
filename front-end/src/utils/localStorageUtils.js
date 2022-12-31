/*
HOW TO USE THIS MODULE:

//////Example Code of all exported functions////////

import { 
  getUserByEmail,
  isUserPasswordCorrect,
  insertNewUser,
  getAllNotesForUser,
  insertNewNoteForUser,
  updateNoteForUser
} from './localStorageUtils'

const existingUserObj = getUserByEmail(someEmailAddress) // same result as function in db_utils.js
const passwordIsCorrect = isUserPasswordCorrect(somePassword) // same as function in db_utils.js
const newUserObj = insertNewUser(newUserName, newUserEmail, newUserPassword) // save user in localStorage and returns new userObj
const freshArrayOfNoteObjects = getAllNotesForUser(someUserObj) // Now you should get notes by using this function.  You can call it in a component to always get the latest notes from localStorage
insertNewNoteForUser(currentUserObj, noteTitle, noteContent, folder = "") // last "folder" argument is optional to include. Note date is handled inside function

//////////////////////////////////////////////

GENERAL NOTES:

Notes are now separate from users, and they will have a new "userId" field in each object to link to a user ("foreign key").
This will be helpful, as it is closer to how data is actually stored in a database, and it means that it will
be easier to get the update notes for a user, as this list changes during the use of the application.

You don't actually have to directly set or use IDs for users or notes directly.  It's handled already within the functions described above.

//////////////////////////////////////////////
*/

import bcrypt from 'bcryptjs'
import {v4 as uuid} from 'uuid'

// It's best to save re-used strings as constants
// Using repeated plain strings in multiple places is called "using magic strings", which you should avoid.
// This reduces typos and clarifies a string's use.
const LOCAL_STORAGE_STATE_KEY = "state"
const STATE_USERS_KEY = "users"
const STATE_NOTES_KEY = "notes"

// This state will "fix" a missing or broken localStorage state
// It will always be missing the first time you visit the site, or when opening from a private browsing window.
// It's not necessary to use constants for keys below.  This just reduces typos for now.
// React and Angular developers prefer the JS language extension TypeScript to handle keeping consistent objects
const DEFAULT_STATE = {
  [STATE_USERS_KEY]: [],
  [STATE_NOTES_KEY]: []
}

/*////////////////////////////////////////
           Internal Utilities
////////////////////////////////////////*/
// The following functions will not be exported, but used for more specific "database-like" functions below
// Think of them like replacements for the ability to perform basic database operations
const setLocalState = (localStateObj) => {
  // You can only store a string key to a string value in localStorage, but you can save an object as a JSON string and parse it later (see below)
  localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(localStateObj))
}

const getLocalState = () => {
  const localVal = localStorage.getItem(LOCAL_STORAGE_STATE_KEY)

  if(localVal){
    try {
      return JSON.parse(localVal)
    } catch(e){
      console.error(`Could not parse localStorage state at key "${LOCAL_STORAGE_STATE_KEY}". Received "${localVal}". Error: ${e}`)
    }
  }

  // If function makes it to this point, there was no value present, or there was an error in parsing it
  setLocalState(DEFAULT_STATE)
  return DEFAULT_STATE
}

const setPartialLocalState = (partialLocalStateObj) => {
  // This "merges" two objects, with the latter overriding values of the former
  setLocalState({ ...getLocalState(), ...partialLocalStateObj })
}

const getAllUsers = () => getLocalState()[STATE_USERS_KEY]

const getAllNotes = () => getLocalState()[STATE_NOTES_KEY]

const _generateNewId = (idArr) => {
  return uuid()
  // if(idArr.length > 0){
  //   // return Math.max(...idArr) + 1
  // }
  // return 1
}

const generateNewUserId = () => {
  return _generateNewId(getAllUsers().map(({ id }) => id))
}

const generateNewNoteId = () => {
  return _generateNewId(getAllNotes().map(({ id }) => id))
}

/*////////////////////////////////////////
           Exported Utilities
////////////////////////////////////////*/
// These more specific utilities will provide you with some actions you can use in your application

export const getUserByEmail = (inputEmail) => getAllUsers().find(({ email }) => inputEmail === email)

export const isUserPasswordCorrect = (user, password) => bcrypt.compareSync(password, user.password_encrypted)

export const insertNewUser = (name, email, password) => {

  const newUser = {
    id: generateNewUserId(),
    name: name,
    email: email,
    password_encrypted: bcrypt.hashSync(password, 10),
    metadata: {}
  }

  // spread syntax works for Arrays.  This creates a new array with the old users copied and the new user at the end
  setPartialLocalState({ [STATE_USERS_KEY]: [...getAllUsers(), newUser] })

  // You can use the new user right away
  return newUser
}

// Notes should now have a userId field
// Now you can pull back an up-to-date notes list for any user, without saving them into the user object directly
export const getAllNotesForUser = (userObj) => {
  return getAllNotes().filter(({ userId }) => userId === userObj.id)
}

// folder defaults to "" for now
export const insertNewNoteForUser = (userObj, noteTitle, noteContent, folder = "") => {

  const newNote = {
    id: generateNewNoteId(),
    userId: userObj.id, // a "foreign key" to the user, allowing it to be grabbed for that user only later
    title: noteTitle,
    content: noteContent,
    folder: folder,
    lastModified: new Date().toLocaleDateString()
  }

  setPartialLocalState({ [STATE_NOTES_KEY]: [...getAllNotes(), newNote] })
}

export const updateNoteForUser = (updatedNote) => {

  const newNotes = getAllNotes().map(existingNote => {
    if(existingNote.id === updatedNote.id){
      return updatedNote
    }
    return existingNote
  })

  setPartialLocalState({ [STATE_NOTES_KEY]: newNotes })
}

export const deleteNoteForUser = (deletedNote) => {

  const newNotes = getAllNotes().filter(existingNote => existingNote.id !== deletedNote.id)

  setPartialLocalState({ [STATE_NOTES_KEY]: newNotes })
}