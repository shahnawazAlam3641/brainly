// import React from "react";
import TwitterIcon from "../svgs/TwitterIcon";
import YoutubeIcon from "../svgs/YoutubeIcon";
import DocumentIcon from "../svgs/DocumentIcon";
import LinkIcon from "../svgs/LinkIcon";
import { AllIcon } from "../svgs/AllIcon";

interface propsData {
  currentTab: string;
  setCurrentTab: (data: string) => void;
}

const Sidebar = (props: propsData) => {
  const currentTab = props.currentTab;
  const setCurrentTab = props.setCurrentTab;

  return (
    <div className="flex flex-col gap-1 p-5 w-fit bg-slate-50 md:min-w-60  min-h-[90vh] ">
      <div
        onClick={() => setCurrentTab("All")}
        className={`flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-200 ${
          currentTab == "All" && "bg-slate-200"
        } transition-all duration-400`}
      >
        <AllIcon />
        <span className="hidden md:block text-xl text-slate-700 font-normal">
          All Notes
        </span>
      </div>
      <div
        onClick={() => setCurrentTab("Twitter(X)")}
        className={`flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-200 ${
          currentTab == "Twitter(X)" && "bg-slate-200"
        } transition-all duration-400`}
      >
        <TwitterIcon />
        <span className="hidden md:block text-xl text-slate-700 font-normal">
          Tweets
        </span>
      </div>
      <div
        onClick={() => setCurrentTab("Youtube")}
        className={`flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-200 ${
          currentTab == "Youtube" && "bg-slate-200"
        } transition-all duration-400`}
      >
        <YoutubeIcon />
        <span className="hidden md:block text-xl text-slate-700 font-normal">
          Videos
        </span>
      </div>
      <div
        onClick={() => setCurrentTab("Document")}
        className={`flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-200 ${
          currentTab == "Document" && "bg-slate-200"
        } transition-all duration-400`}
      >
        <DocumentIcon />
        <span className="hidden md:block text-xl text-slate-700 font-normal">
          Documents
        </span>
      </div>
      <div
        onClick={() => setCurrentTab("Link")}
        className={`flex gap-4 px-2 items-center rounded-md py-3 hover:bg-slate-200 ${
          currentTab == "Link" && "bg-slate-200"
        } transition-all duration-400`}
      >
        <LinkIcon />
        <span className="hidden md:block text-xl text-slate-700 font-normal">
          Links
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
