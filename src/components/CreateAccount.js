import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import '../style/style-create-account.css'

import app from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const CreateAccount = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { signup } = useAuth()
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

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;

    setConfirmPassword(newConfirmPassword);
  }

  useEffect(() => {
    if(email === "" || password === "" || confirmPassword === "") {
      setIsInputFilled(false)
    } else {
      setIsInputFilled(true)
    }
  }, [email, password, confirmPassword, setIsInputFilled])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    if (isInputFilled) {

      if (password !== confirmPassword) {
        return setError("Passwords do not match")
      }
  
      try {
        setError('')
        setLoading(true)
        await signup(email, password)
        // await addUserToFirestore()
        history.push("/")
      } catch(err) {
        console.log(err)
        setError("Failed to create an account")
      }
  
      setLoading(false)

    }


  }, [email, password, confirmPassword, isInputFilled])

  return(
    <div id="create-account-container">
      <div id="create-account-form">
        <h2>Create Account</h2>
        <h4>Create an account to continue</h4>
        
        <form>
          {/* <label htmlFor="mail">Email Address</label> */}
          {/* <TextField required type="email" id="email" label="Email Address" inputRef={emailRef} /> */}
          {/* {(isEmailUnvalid) && <div className="login-error-mess">Email is not Valid</div>} */}

          {/* <label htmlFor="password">Password</label> */}
          {/* <TextField required type="password" id="password" label="Password" inputRef={passwordRef} /> */}

          {/* <label htmlFor="confirm-password">Confirm Password</label> */}
          {/* <TextField type="password" id="confirm-password" label="Confirm Password" inputRef={passwordConfirmRef} /> */}
          {/* {(arePasswordsDifferent) && <div className="login-error-mess">Passwords Don't Match</div>} */}

          <label htmlFor="mail">Email Address</label>
          <input type="email" id="mail" name="user_email" value={email} onChange={handleEmailChange} className="custom-create-account-input-UI"/>
          {/* {(isEmailUnvalid) && <div className="login-error-mess">Email is not Valid</div>} */}

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="user_password" value={password} onChange={handlePasswordChange} className="custom-create-account-input-UI"/>

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-user_password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="custom-create-account-input-UI"/>
          {/* {(arePasswordsDifferent) && <div className="login-error-mess">Passwords Don't Match</div>} */}

          {error && <div className="auth-error-mess">{error}</div>}

          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={!isInputFilled ? "disabled button_form" : "button_form"}>
            Create Account
          </button>
          {/* <h5 id="return-to-login-text">Registered? <span><NavLink to="/login" className="create-account-link">Login</NavLink></span></h5> */}
          <h4 className="return-to-login-text">Already have an account? <span><NavLink to="/login" className="create-account-link">Log In</NavLink></span></h4>
        </form>

      </div>
    </div>
  )
}

export default CreateAccount;