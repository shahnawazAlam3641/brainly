import React, { ReactElement } from 'react'

interface buttonProp {
    startIcon?:ReactElement,
    text:string,
    endIcon?:ReactElement,
    isPrimary:boolean
}

const Button = (props:buttonProp) => {
  return (
    <button className={`flex gap-2 items-center justify-center  px-3 py-2 w-fit h-fit rounded-md hover:scale-95 transition-all duration-200 ${props.isPrimary ? "text-white bg-purple-600" : " text-purple-600 bg-purple-200"}`}> 
        {props.startIcon && <span>{props.startIcon}</span>}
        {props.text && <span>{props.text}</span>}
        {props.endIcon && <span>{props.endIcon}</span>}
    </button>
  )
}

export default Button