// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Body from "./components/Body"


function App() {

  return (
    <div>

      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <Body/>
      </div>

    </div>
  )
}

export default App
