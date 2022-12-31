import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, NavLink } from 'react-router-dom'
import '../style/style-create-account.css'

const CreateAccount = ({
  checkCreateAccount,
  isAccountValid,
  isEmailUnvalid,
  arePasswordsDifferent,
  isAuthorized
}) => {

  // now that we have the checkCreateAccount function, the email and password states can live here
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isInputFilled, setIsInputFilled] = useState(false)

  // const [user, setUser] = useState("")

  const handleNameChange = (e) => {
    const newName = e.target.value;

    setName(newName);
  }

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

  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    if(isInputFilled){
      checkCreateAccount(name, email, password, confirmPassword);
    }
  }, [name, email, password, confirmPassword, isInputFilled, checkCreateAccount])

  useEffect(() => {
    if(name === "" || email === "" || password === "" || confirmPassword === ""){
      setIsInputFilled(false)
    } else {
      setIsInputFilled(true)
    }
  }, [name, email, password, confirmPassword, setIsInputFilled])

  if(isAccountValid){
    // console.log("Account Created")
    // Note: this is now handled in checkCreateAccount()
    // Create a new entry in the database.json file/local storage, stored in server/database 
    // Hash password
    // Authenticate user and redirect to dashboard with return <Redirect to="/dash"/>
  }

  if(isAuthorized){
    return <Redirect to="/dash"/>
  }

  return(
    <div id="create-account-container">
      <div id="create-account-form">
        <h2>Create Account</h2>
        <h4>Create an Account to continue</h4>
        
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="user_name" value={name} onChange={handleNameChange}/>

          <label htmlFor="mail">Email Address</label>
          <input type="email" id="mail" name="user_email" value={email} onChange={handleEmailChange}/>
          {(isEmailUnvalid) && <div className="login-error-mess">Email is not Valid</div>}

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="user_password" value={password} onChange={handlePasswordChange}/>

          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-user_password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
          {(arePasswordsDifferent) && <div className="login-error-mess">Passwords Don't Match</div>}

          <button 
            type="submit"
            onClick={handleButtonClick}
            className={!isInputFilled ? "disabled button_form" : "button_form"}>
            Create Account
          </button>
          <h5 id="return-to-login-text">Registered? <span><NavLink to="/login" className="create-account-link">Login</NavLink></span></h5>
        </form>

      </div>
    </div>
  )
}

export default CreateAccount;