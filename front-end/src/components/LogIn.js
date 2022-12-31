import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, NavLink } from 'react-router-dom'
import '../style/style-login.css'

const LogIn = ({
  checkLogin,
  isAuthorized,
  isEmailWrong,
  isPasswordWrong
}) => {

  // now that we have the checkLogin function, the email and password states can live here
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isInputFilled, setIsInputFilled] = useState(false)

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    setPassword(newPassword);
  }

  // useCallback creates a special React function that keeps itself from being redefined inside the component more than needed
  // It updates its interval values only if email, password, isInputFilled, or checkLogin change, its only "dependencies"
  // It works like a normal function, just not one that has to be completely redefined everytime LogIn re-renders
  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    if(isInputFilled){
      checkLogin(email, password)
    }
  }, [email, password, isInputFilled, checkLogin])

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

  // This prop will come in true if the checkLogin function calls setIsAuthroized(true) in Router
  if(isAuthorized){
    return <Redirect to="/dash"/>
  }

  return(
    <div id="login-container">
      <div id="login-form">
        <h2>Log In</h2>
        <h4>Sign into your account to continue</h4>

        {/* <div className="form-section" id='email-container'>
          <h5>Email Address</h5>
          <div className="input-field" id='email-field'></div>
        </div>

        <div className="form-section" id='password-container'>
          <h5>Password</h5>
          <div className="input-field" id='password-field'></div>
        </div>

        <div id="signin"><h3>Sign In</h3></div> */}

        <form>
          <label htmlFor="mail">Email Address</label>
          <input type="email" id="mail" name="user_email" value={email} onChange={handleEmailChange}/>
          {/* Pattern for only rendering some JSX whenever a condition is true: */}
          {isEmailWrong && <div className="login-error-mess">Email not found</div>}

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="user_password" value={password} onChange={handlePasswordChange}/>
          {isPasswordWrong && <div className="login-error-mess">Invalid password</div>}

          <button 
            type="submit" 
            onClick={handleButtonClick}
            className={!isInputFilled ? "disabled button_form" : "button_form"}
          >
            Sign In
          </button>
        </form>

        <h5 id="createAccount-text">Not Registered? <span><NavLink to="/create-account" className="create-account-link">Create Account</NavLink></span></h5>
      </div>
    </div>
  )
}

export default LogIn;