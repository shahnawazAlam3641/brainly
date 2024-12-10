// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
// import CardsBody from "./components/CardsBody"
import NotesContainer from "./components/NotesContainer"
import { BrowserRouter, Route, Routes } from "react-router"
import Hero from "./components/Hero"
import Sign from "./components/Sign"
import DashboardBody from "./components/DashboardBody"
import Error from "./components/Error"


function App() {

  return (
    <BrowserRouter>
      {/* <div className="max-w-[100vw]"> */}
        <Navbar/>
        <Routes>
          <Route index element={<Hero/>} />
          <Route path="/signin" element={<Sign/>} />
          <Route path="/dashboard" element={<DashboardBody/>} />
          <Route path="*" element={<Error/>} />
          

          
        </Routes>
      {/* </div> */}
    {/* <>
      
      <div className="flex">
        <Sidebar/>
        <NotesContainer/>
      </div>
    </> */}
    </BrowserRouter>
  )
}

export default App
