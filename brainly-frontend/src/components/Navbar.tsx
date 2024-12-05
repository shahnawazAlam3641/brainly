import React from 'react'
import BrainIcon from '../svgs/BrainIcon'

const Navbar = () => {
  return (
    <div className="flex items-center gap-4 px-4 min-h-[10vh] bg-red-300">
      <BrainIcon />
      <p className="text-3xl font-semibold text-slate-700">Brainly</p>
    </div>
  )
}

export default Navbar