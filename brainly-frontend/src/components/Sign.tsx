import React, { useState } from 'react'
import Button from './Button'
import {useForm} from "react-hook-form"
import SignGraphic from "../assets/Computer login-rafiki.svg"
// import { apiEndpoints } from '../utils/apiEndpoints'
import { apiConnector } from '../utils/apiConnector'
import { setSignupData, setToken } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { setNotes } from '../slices/notesSlice'
import { useNavigate } from 'react-router'

interface sign {
  Name?:string,
  Email:string,
  Password:string
}

const Sign = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const {CONTENT_API} = apiEndpoints

  const [isSigninPage, setIsSigninPage] = useState(true)

  const {register,handleSubmit,formState:{errors}} = useForm()

  // const signup = async(formdata:sign)=>{
  //   const data = await axios.post("http://localhost:4000/api/v1/signup", {name:formdata.name,email:formdata.email,passsword:formdata.password})
  //   console.log(data)
  // }

  const sign = async(formdata:sign)=>{

    if(isSigninPage){
      console.log(formdata)

      const response =await apiConnector("POST", "http://localhost:4000/api/v1/signin", {email:formdata.Email,password:formdata.Password})
      console.log(response)
      const token = response?.data?.token
  
      localStorage.setItem("token",token)
      dispatch(setToken(token))
      // dispatch(setNotes(response?.data?.user?.content))
      // response.data.user.content = undefined
      dispatch(setSignupData(response?.data?.user))
      navigate("/dashboard")

    }else{
      console.log(formdata)

      const response = await apiConnector("POST", "http://localhost:4000/api/v1/signup", {name:formdata.Name,email:formdata.Email,password:formdata.Password})
      console.log(response)
      const token = response?.data?.token
  
      localStorage.setItem("token",token)
      dispatch(setToken(token))
      // dispatch(setNotes(response?.data?.user?.content))
      // response.data.user.content = undefined
      dispatch(setSignupData(response?.data?.user))
      navigate("/dashboard")
    }

    
  }


  return (
    <div className=' py-4 flex  h-[90vh] w-[100vw] justify-between gap-5 items-center bg-slate-50'>

<img src={SignGraphic} className='hidden md:block max-w-[50vw] mx-auto'/>


      <div className='min-w-[50%] mx-auto'>
        <div className='flex flex-col justify-center mx-auto bg-white border rounded-md shadow px-4 py-12 items-center max-w-80'>
          <p className='text-2xl font-semibold text-slate-600'>{isSigninPage ? "Sign In" : "Sign Up"}</p>
          {/* <form className='flex flex-col max-w-96 gap-2 bg-red-200'>
            {!isSigninPage && <input type='text'/>}
            <input type='email'/>
            <input type='password'/>
            <Button isPrimary={true} text={isSigninPage ? "Sign in" : "Sign Up"} />
          </form> */}

          <form className='flex flex-col justify-center items-center  gap-4 p-5' onSubmit={handleSubmit((data) => sign(data))}>
          {!isSigninPage && <input className='border border-purple-200 border-solid  py-2 px-4  rounded-md' placeholder='Name'  type='text' {...register('Name', { required: true })} />}
            {errors.Name && <p>Name is required.</p>}
            <input className='border border-purple-200 border-solid py-2 px-4  rounded-md' placeholder='Email'  type='email' {...register('Email', { required: true })} />
            {errors.Email && <p>Email name is required.</p>}
            <input className='border border-purple-200 border-solid py-2 px-4  rounded-md' placeholder='Password'  type='password' {...register('Password',{required:true})} />
            {errors.age && <p>Please enter number for age.</p>}
            <div className='w-full'><Button width='w-full' type='submit' isPrimary={true} text={isSigninPage ? "Sign in" : "Sign Up"} /></div>
        </form>

          <p className='cursor-pointer text-slate-500' onClick={()=> setIsSigninPage(!isSigninPage)}>{isSigninPage ? "New to Brainly? Sign Up Now" : "Already Registered? Sign In Now"}</p>
        </div>
      </div>

      
    </div>
  )
}

export default Sign