import React from 'react'
import Sidebar from './Sidebar'
import NotesContainer from './NotesContainer'

const DashboardBody = () => {
  return (
    <div className="flex">
        <Sidebar/>
        <NotesContainer/>
      </div>
  )
}

export default DashboardBody