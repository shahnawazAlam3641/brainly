import React from 'react'
import TwitterIcon from '../svgs/TwitterIcon'
import YoutubeIcon from '../svgs/YoutubeIcon'
import DocumentIcon from '../svgs/DocumentIcon'
import LinkIcon from '../svgs/LinkIcon'

const Sidebar = () => {
  return (
    <div className="flex flex-col p-5 bg-green-200 min-w-60  min-h-[90vh] ">
          <div className="flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-100 transition-all duration-400">
            <TwitterIcon/>
            <span className="text-xl text-slate-700 font-normal">Tweets</span>
          </div>
          <div className="flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-100 transition-all duration-400">
            <YoutubeIcon/>
            <span className="text-xl text-slate-700 font-normal">Videos</span>
          </div>
          <div className="flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-100 transition-all duration-400">
            <DocumentIcon/>
            <span className="text-xl text-slate-700 font-normal">Documents</span>
          </div>
          <div className="flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-100 transition-all duration-400">
            <LinkIcon/>
            <span className="text-xl text-slate-700 font-normal">Links</span>
          </div>
        </div>
  )
}

export default Sidebar