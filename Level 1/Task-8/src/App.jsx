import React from 'react'
import Render from "./Render"


function App() {
  return (
    <div>
       <UserGreeting role="Admin" />
      <UserGreeting role="User" />
      <UserGreeting role="Guest" />
      <Render />
    </div>
  )
}

export default App