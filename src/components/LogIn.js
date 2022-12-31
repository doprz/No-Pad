import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import '../style/style-login.css'
import '../style/firebaseui-styling.css'
import TextField from '@material-ui/core/TextField';

import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const LogIn = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isInputFilled, setIsInputFilled] = useState(false)
  const history = useHistory()

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    setPassword(newPassword);
  }

  // useEffect looks like useCallback, but instead of a creating a function for you to call,
  // it runs the function inside automatically any time one of its "dependencies" changes.
  // The "dependencies" are [email, password, setIsInputFilled],
  // so anytime the user changes the email or password, it evaluates whether either is empty
  useEffect(() => {
    if(email === "" || password === ""){
      setIsInputFilled(false)
    } else {
      setIsInputFilled(true)
    }
  }, [email, password, setIsInputFilled])

  const addUserToFirestore = (authResult) => {
    firebase
      .firestore()
      .collection('users')
      .doc(authResult.user.uid)
      .set({email: authResult.user.email})
      .then(() => {
        // console.log("To Dashboard")
      }, dbError => {
        console.log(dbError + " - Failed to add user to firebase storage")
      })
  }

  // Configure FirebaseUI
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to dashboard after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        // console.log(authResult)
        // console.log(redirectUrl)

        if (authResult.additionalUserInfo.isNewUser) {
          addUserToFirestore(authResult)
          // console.log("User added to firestore")
        }

        // Doesn't redirect to dashboard after sign-in
        // It lets BrowserRouter take care of redirect
        return false
      },
    },
  }

  // useCallback creates a special React function that keeps itself from being redefined inside the component more than needed
  // It updates its interval values only if email, password, isInputFilled, or checkLogin change, its only "dependencies"
  // It works like a normal function, just not one that has to be completely redefined everytime LogIn re-renders
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    if (isInputFilled) {

      try {
        setError('')
        setLoading(true)
        await login(email, password)
        history.push("/")
      } catch {
        setError("Failed to log in")
      }
  
      setLoading(false)

    }

  }, [email, password, isInputFilled])

  return(
    <div id="login-container">
      <div id="login-form">
        <h2>Log In</h2>
        <h4>Log in to your account to continue</h4>

        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

        <div className="or">
          <hr></hr>
          <span>or</span>
          <hr></hr>
        </div>

        <form>
          {/* <label htmlFor="mail">Email Address</label> */}
          {/* <TextField required type="email" id="email" label="Email Address" inputRef={emailRef} /> */}
          {/* {(isEmailUnvalid) && <div className="login-error-mess">Email is not Valid</div>} */}

          {/* <label htmlFor="password">Password</label> */}
          {/* <TextField required type="password" id="password" label="Password" inputRef={passwordRef} /> */}

          <label htmlFor="mail">Email Address</label>
          <input type="email" id="mail" name="user_email" value={email} onChange={handleEmailChange} className="custom-login-input-UI"/>
          {/* Pattern for only rendering some JSX whenever a condition is true: */}
          {/* {isEmailWrong && <div className="login-error-mess">Email not found</div>} */}

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="user_password" value={password} onChange={handlePasswordChange} className="custom-login-input-UI"/>
          {/* {isPasswordWrong && <div className="login-error-mess">Invalid password</div>} */}

          {error && <div className="auth-error-mess">{error}</div>}

          <button 
            type="submit" 
            onClick={handleSubmit}
            disabled={loading}
            className={!isInputFilled ? "disabled button_form" : "button_form"}>
            Log In
          </button>

          <h4 id="forgotPassword-text"><span>
            <NavLink to="/forgot-password" className="create-account-link">Forgot Password?</NavLink></span>
          </h4>

        </form>

        {/* <h5 id="createAccount-text">Not Registered? <span><NavLink to="/create-account" className="create-account-link">Create Account</NavLink></span></h5> */}
        <h4 id="createAccount-text">Need an account? <span><NavLink to="/create-account" className="create-account-link">Create Account</NavLink></span></h4>

      </div>
    </div>
  )
}

export default LogIn;