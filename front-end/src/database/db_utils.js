
import db from './database.json'

import bcrypt from 'bcryptjs'

// users is an array of user objects.  Array.find can use a callback to find an existing item
export const getUserByEmail = (email) => {
  return db.users.find((user) => user.email === email)
}

export const isUserPasswordCorrect = (user, password) => {
  return bcrypt.compareSync(password, user.password_encrypted)
}