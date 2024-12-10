import React, { useEffect, useState } from 'react'
import Button from './Button'
import ShareIcon from '../svgs/ShareIcon'
import PlusIcon from '../svgs/PlusIcon'
import Card from './Card'
import { addCard, getUserNotes } from '../utils/operations'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { pushNote, setNotes } from '../slices/notesSlice'

const NotesContainer = ({currentTab,setCurrentTab}) => {
  const {register,handleSubmit,formState:{errors}} = useForm()

  // const [currentTab, setCurrentTab] = useState(null)

  const [cardsToShow, setCardsToShow] = useState([])

  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const content = useSelector((state) => state.notes.content)


  const [addModal,setAddModal] = useState(false)


  const handleAddContent = async(data)=>{
    console.log(data)
    const tags = data.Tag.split(",").map(elem => elem.trim())
    console.log(tags)
    const payload = {title:data.Title,link:data.Link,type:data.Type,tags:tags}
     
    
    const createdContent = await addCard(payload,token)
    dispatch(pushNote(createdContent?.data?.content))
    setAddModal(false)
    console.log(createdContent)
  }

  const fetchUserNotes = async()=>{
    const allNotes = await getUserNotes(token)
    dispatch(setNotes(allNotes?.data?.contents))
  }

  useEffect(()=>{
    fetchUserNotes()
  },[])

  return (
        <>

          

          <div className="flex flex-col gap-5 w-full overflow-y-auto  overflow-x-hidden">
            <div className="flex justify-between w-full p-8">

              <p className="text-3xl font-medium text-slate-700">All Notes</p>
              <div className=" flex gap-4">
                <Button startIcon={<ShareIcon/>} text={"Share Brain"} isPrimary={false}/>
                <Button onPress={()=>setAddModal(true)} startIcon={<PlusIcon/>} text={"Add Content"} isPrimary={true}/>
              </div>

            </div>

            {/* {card container} */}
            {content.length == 0  && <p className='text-2xl text-slate-700 p-8'> No content Show.....Add one now</p>  }

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 px-8">
              {/* card */}
              {content.map((card)=>{
                return <Card token={token} card={{...card}}/>
              })}
              {/* <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/> */}
            </div>
          </div>
          {addModal && (<div className='absolute p-10 rounded-md z-30  top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white shadow-black shadow-2xl'>
            <div >
              <form className='flex flex-col justify-center items-center  gap-4 p-5' onSubmit={handleSubmit((data) => handleAddContent(data))}>
                  <input className='border border-purple-200 border-solid  py-2 px-4  rounded-md' placeholder='Title'  type='text' {...register('Title', { required: true })} />
                  {errors.Name && <p>Title is required.</p>}

                  <input className='border border-purple-200 border-solid py-2 px-4  rounded-md' placeholder='Link'  type='text' {...register('Link', { required: true })} />
                  {errors.Link && <p>Link name is required.</p>}


                  <select className=' border border-purple-200 border-solid  py-2 px-4  rounded-md w-full'  {...register('Type', { required: true })}>
                    <option>Twitter(X)</option>
                    <option>Youtube</option>
                    <option>Document</option>
                    <option>Link</option>
                    
                  </select>

                  <input className='border border-purple-200 border-solid py-2 px-4  rounded-md' placeholder='Enter Tag - Comma (,) seperated'  type='text' {...register('Tag',{required:false})} />
                  

                  <div className='flex'><Button   isPrimary={true} text={"Add Note"} /></div>
              </form>
            </div>
          </div>)}
          {addModal && <div onClick={()=>setAddModal(false)} className='absolute z-20 -top-20 left-0 right-0 -bottom-20 bg-[#0000005a]'></div>}
        
        </>
  )
}

export default NotesContainer