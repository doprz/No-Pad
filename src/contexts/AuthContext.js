import React, { useEffect, useContext, useState } from 'react'
import app, { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const addUserToFirestore = (user) => {
  app
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({email: user.email})
    .then(() => {
      // console.log("To Dashboard")
    }, dbError => {
      console.log(dbError + " - Failed to add user to firebase storage")
    })
}

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    const signupWithEPPromise = auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signup and signin successful
        const user = userCredential.user;
        // If user account is created for the first time then setup their account with firestore
        addUserToFirestore(user)
        console.log("User added to firestore")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      })


    return signupWithEPPromise
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  // Run when component is mounted
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      // console.log(user)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
