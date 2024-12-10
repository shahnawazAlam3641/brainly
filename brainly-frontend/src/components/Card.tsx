import React, { useState } from 'react'
import DeleteIcon from '../svgs/DeleteIcon'
import ShareIcon from '../svgs/ShareIcon'
import DocumentIcon from '../svgs/DocumentIcon'
import { deleteUserNote } from '../utils/operations'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../slices/notesSlice'
import YoutubeIcon from '../svgs/YoutubeIcon'
import TwitterIcon from '../svgs/TwitterIcon'
import { Link } from 'react-router'
import LinkIcon from '../svgs/LinkIcon'

const Card = (props) => {

  const [typeIcon, setTypeIcon] = useState(<DocumentIcon/>)

  const dispatch = useDispatch()


  const createdAt = new Date(props?.card?.createdAt)

  const deleteNoteHandler = async(id:string)=>{
    const response = await deleteUserNote(id, props.token)
    if(response.data.success){
      dispatch(deleteNote(id))
    }
  }
  
  console.log(props.card._id)
  return (
    <div className="flex flex-col gap-2 p-4 bg-white border shadow-sm max-w-72 rounded-lg min-h-96">
              {/* head */}
              <div className="flex justify-between">
                <div className="flex gap-1">
                  {props.card.type == "Youtube" ? <YoutubeIcon/> : props.card.type == "Document" ? <DocumentIcon/> : props.card.type == "Twitter(X)" ? <TwitterIcon/> : props.card.type == "Link" ? <LinkIcon/> : "" } 
                  <span>{props?.card?.title}</span>
                </div>

                <div className="flex gap-1">
                  <ShareIcon/>
                  <span onClick={()=> deleteNoteHandler(props?.card?._id)} title='Delete'><DeleteIcon/></span>
                </div>
              </div>

              {/* body */}

              <div className="w-full">

                {props.card.type == "Twitter(X)" && <blockquote className="twitter-tweet">
        <a href="https://twitter.com/kirat_tw/status/1866486851495948483"></a>
    </blockquote>}
                
              {props.card.type == "Youtube" && <iframe className="rounded-md max-w-full" src={"https://www.youtube.com/embed/" + `${props?.card?.link.split("/").pop().replace("watch?v=", "")}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

              {props.card.type == "Link"  && <a href={props.card.link} className='hover:underline text-blue-500' target='_blank' > {props.card.link} </a> }

              {props.card.type == "Document" && <a href={props.card.link} className='hover:underline text-blue-500' target='_blank' > {props.card.link} </a> }


              </div>

              {/* tag container */}

              <div>
                <div className="flex flex-wrap gap-2">

                {props?.card?.tag.map((tag)=>{
                  return <p className="bg-purple-200 text-sm text-purple-600 rounded-full py-1 px-2">
                  {tag.name}
                </p>
                })}
                
               

              </ div>

              <p className="text-slate-400 font-semibold">
                Added on - {createdAt.toLocaleDateString()}
              </p>
              </div>



            </div>
  )
}

export default Card