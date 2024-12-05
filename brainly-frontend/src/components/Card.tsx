import React from 'react'
import DeleteIcon from '../svgs/DeleteIcon'
import ShareIcon from '../svgs/ShareIcon'
import DocumentIcon from '../svgs/DocumentIcon'

const Card = () => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-yellow-200 max-w-72 rounded-lg min-h-96">
              {/* head */}
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <DocumentIcon/>
                  <span>Project Ideas</span>
                </div>

                <div className="flex gap-1">
                  <ShareIcon/>
                  <DeleteIcon/>
                </div>
              </div>

              {/* body */}

              <div className="w-full">
                

                <iframe className="rounded-md max-w-full" src="https://www.youtube.com/embed/ofHGE-85EIA?si=3jzZYGyJ776ESLew" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              {/* tag container */}

              <div className="flex flex-wrap gap-2">
                
                <p className="bg-purple-200 text-sm text-purple-600 rounded-full py-1 px-2">
                  #productivity
                </p>

              </ div>

              <p className="text-slate-400 font-semibold">
                Added on 10/03/2024
              </p>



            </div>
  )
}

export default Card