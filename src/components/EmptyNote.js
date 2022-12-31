import React, { useEffect, useState, useCallback } from 'react';
import ReactQuill from 'react-quill'
import debounce from '../helpers'
import { updateNoteForUser } from '../utils/localStorageUtils'

const EmptyNote = () => {

  return(
    <div className="noteEditorContainer">

    </div>
  )
  
}

export default EmptyNote;