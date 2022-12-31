import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackBarMessage = ( {message, toggle, setSnackBarToggle} ) => {

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  // Snackbar
  const handleSBOpen = () => {
    setSnackBarOpen(true)
    // console.log("Snackbar opened")
  }

  const handleSBClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false)
    setSnackBarToggle(false)
  }

  useEffect(() => {
    if (toggle) {
      setSnackBarOpen(true)
    }
  }, [toggle])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snackBarOpen}
      autoHideDuration={3000}
      onClose={handleSBClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSBClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}

export default SnackBarMessage;