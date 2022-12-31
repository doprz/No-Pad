/*
Main ideas:
* Arrow Functions
* Destructuring objects
* Destructuring objects in a function parameter
* Components and props
* Destructuring the props object
*/

import React from 'react'

const arrowFuncExample = (obj) => {
  console.log(obj.title)
}

// same as previous function
const arrowFuncExampleWithDestructuring = ({ title }) => {
  console.log(title)
}

const noteArray = [
  { title: "Title 1", content: "Content 1" },
  { title: "Title 2", content: "Content 2" }
]

const Note = ({ title, content }) => (
  <li className="note">
    <h2>{title}</h2>
    <p>{content}</p>
  </li>
)

const App = () => (
  <ul className="notes">
    {noteArray.map(({ title, content }) => {
      return <Note title={title} content={content}/>
    })}
  </ul>
)

export default App