import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import '../style/style-login.css'
import TextField from '@material-ui/core/TextField';

import { useAuth } from '../contexts/AuthContext'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")

  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isInputFilled, setIsInputFilled] = useState(false)
  
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
  }

  useEffect(() => {
    if(email === ""){
      setIsInputFilled(false)
    } else {
      setIsInputFilled(true)
    }
  }, [email, setIsInputFilled])

  // useCallback creates a special React function that keeps itself from being redefined inside the component more than needed
  // It updates its interval values only if email, password, isInputFilled, or checkLogin change, its only "dependencies"
  // It works like a normal function, just not one that has to be completely redefined everytime LogIn re-renders
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    if (isInputFilled) {

      try {
        setError('')
        setMessage('')
        setLoading(true)
        await resetPassword(email)
        setMessage('Check your inbox for further instructions')
      } catch {
        setError("Failed to reset password")
      }
  
      setLoading(false)

    }

  }, [email, isInputFilled])

  return(
    <div id="login-container">
      <div id="login-form">
        <h2>Forgot Password</h2>

        {message && <h4>message</h4>}

        <form>
          <label htmlFor="mail">Email Address</label>
          <input type="email" id="mail" name="user_email" value={email} onChange={handleEmailChange} className="custom-login-input-UI"/>

          {error && <div className="auth-error-mess">{error}</div>}

          <button 
            type="submit" 
            onClick={handleSubmit}
            disabled={loading}
            className={!isInputFilled ? "disabled button_form" : "button_form"}>
            Reset Password
          </button>

          <h4 className="return-to-login-text">Already have an account? <span><NavLink to="/login" className="create-account-link">Log In</NavLink></span></h4>

        </form>

        <h4 id="createAccount-text">Need an account? <span><NavLink to="/create-account" className="create-account-link">Create Account</NavLink></span></h4>

      </div>
    </div>
  )
}

export default ForgotPassword;