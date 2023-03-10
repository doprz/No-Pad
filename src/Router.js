import React, { useState, useCallback } from 'react';
import { Switch, Route, Redirect } from "react-router";
import LogIn from './components/LogIn';
import ForgotPassword from './components/ForgotPassword'
import CreateAccount from './components/CreateAccount'
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'
import AuthRedirectRoute from './components/AuthRedirectRoute'
import { useAuth } from './contexts/AuthContext'

// import { getUserByEmail, isUserPasswordCorrect } from './database/db_utils'

import { 
  getUserByEmail,
  isUserPasswordCorrect,
  insertNewUser
} from './utils/localStorageUtils'


const Router = () => {

  const { currentUser } = useAuth()

  // user will be replaced by user object from db in the checkLogin function below
  // Using the entire user object as a value for your components means you don't need to look up database info very often
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isEmailWrong, setIsEmailWrong] = useState(false)
  const [isPasswordWrong, setIsPasswordWrong] = useState(false)

  const [isAccountValid, setIsAccountValid] = useState(false)
  const [isEmailUnvalid, setIsEmailUnvalid] = useState(false)
  const [arePasswordsDifferent, setArePasswordsDifferent] = useState(false)

  // useCallback creates a function that you can use normally,
  // but it is optimized for when you want to define a function inside a React component using state values/setters
  // There is another example with more explanation in the Login component
  const checkLogin = useCallback((email, password) => {
    // If they are re-attempting login, just clear these login errors:
    setIsEmailWrong(false)
    setIsPasswordWrong(false)

    const existingUser = getUserByEmail(email)

    // getUserByEmail returns undefined if no user was found
    if(!existingUser){
      setIsEmailWrong(true)
      return
    }

    // this is where the bycrpt comparison happens
    if(!isUserPasswordCorrect(existingUser, password)){
      setIsPasswordWrong(true)
      return
    }

    // function only gets to this point if user exists and password is correct
    setIsAuthorized(true)
    setUser(existingUser)
  }, [setIsEmailWrong, setIsPasswordWrong, setIsAuthorized, setUser])

  const allowAuthorization = (email) => {
    setEmail(email)
    setIsAuthorized(true)
    // console.log("Authorized")
  }

  const checkCreateAccount = useCallback((name, email, password, confirmPassword) => {
    // Prevent Errors upon restart of the form
    setIsEmailUnvalid(false)
    setArePasswordsDifferent(false)

    const existingUser = getUserByEmail(email)

    // getUserByEmail returns undefined if no user was found
    if(existingUser){
      setIsEmailUnvalid(true)
      return
    }

    // Checks is both passwords are different otherwise return which cancels action
    if(password !== confirmPassword){
      setArePasswordsDifferent(true)
      return
    }

    // function only gets to this point if the user doesn't exist and the passwords match
    setIsAccountValid(true)
    // setUser(insertNewUser(name, email, password))
    // setIsAuthorized(true)
    // console.log("Account Valid")

  }, [setIsEmailUnvalid, setArePasswordsDifferent, setIsAccountValid])

  return(
    
    <Switch>
      <AuthRedirectRoute path="/login" component={LogIn} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/create-account" component={CreateAccount} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <Redirect path="*" to="/"/>
    </Switch>

    // <AuthProvider>
    //   <Switch>
    //     <Route path="/login">
    //       <LogIn 
    //         checkLogin={checkLogin}
    //         allowAuthorization={allowAuthorization}
    //         isAuthorized={isAuthorized}
    //         isEmailWrong={isEmailWrong}
    //         isPasswordWrong={isPasswordWrong}
    //       />
    //     </Route>
    //     <Route path="/create-account">
    //       <CreateAccount />
    //     </Route>
    //     {!isAuthorized && <Redirect to="/login"/>}
    //     <Route path="/dash">
    //       {/* <Dashboard user={user}/> */}
    //       <Dashboard email={email}/>
    //     </Route>
    //     <Redirect path="*" to="/login"/>
    //   </Switch>
    // </AuthProvider>
  )
}

export default Router;