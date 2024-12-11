// import React, { useState } from "react";
// import { useState } from "react";
import DeleteIcon from "../svgs/DeleteIcon";
// import ShareIcon from "../svgs/ShareIcon";
import DocumentIcon from "../svgs/DocumentIcon";
import { deleteUserNote } from "../utils/operations";
import { useDispatch } from "react-redux";
import { deleteNote, NoteDoc } from "../slices/notesSlice";
import YoutubeIcon from "../svgs/YoutubeIcon";
import TwitterIcon from "../svgs/TwitterIcon";
import LinkIcon from "../svgs/LinkIcon";

interface cardProp {
  card: NoteDoc;
  token: string | null;
  key: string;
  isShared?: boolean;
}

const Card = (props: cardProp) => {
  // const [typeIcon, setTypeIcon] = useState(<DocumentIcon />);

  const dispatch = useDispatch();

  const createdAt = new Date(props?.card?.createdAt);

  const deleteNoteHandler = async (id: string) => {
    const response = await deleteUserNote(id, props.token);
    if (response.data.success) {
      dispatch(deleteNote(id));
    }
  };

  // console.log(props.card._id)
  return (
    <div
      key={props.key}
      className="flex flex-col gap-2 mb-5 break-inside-avoid p-4 shadow-slate-400  bg-white border shadow-sm max-w-72 rounded-lg"
    >
      {/* head */}
      <div className="flex justify-between">
        <div className="flex gap-1">
          {props.card.type == "Youtube" ? (
            <YoutubeIcon />
          ) : props.card.type == "Document" ? (
            <DocumentIcon />
          ) : props.card.type == "Twitter(X)" ? (
            <TwitterIcon />
          ) : props.card.type == "Link" ? (
            <LinkIcon />
          ) : (
            ""
          )}
          <span>{props?.card?.title}</span>
        </div>

        {!props.isShared && (
          <div className="flex gap-1">
            {/* <ShareIcon /> */}
            <span
              className="hover:scale-95 transition-all duration-200 cursor-pointer"
              onClick={() => deleteNoteHandler(props?.card?._id)}
              title="Delete"
            >
              <DeleteIcon />
            </span>
          </div>
        )}
      </div>

      {/* body */}

      <div className="w-full">
        <a
          href={props.card.link}
          className="hover:underline text-blue-500 max-w-full"
          target="_blank"
        >
          Go to Original Link
        </a>
        {props.card.type == "Twitter(X)" && (
          <blockquote className="twitter-tweet">
            <a href={props.card.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {props.card.type == "Youtube" && (
          <iframe
            className="rounded-md max-w-full"
            src={
              "https://www.youtube.com/embed/" +
              `${props?.card?.link?.split("/")?.pop()?.replace("watch?v=", "")}`
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {/* {props.card.type == "Link" && (
          <a
            href={props.card.link}
            className="hover:underline text-blue-500"
            target="_blank"
          >
            {" "}
            {props.card.link}{" "}
          </a>
        )}

        {props.card.type == "Document" && (
          <a
            href={props.card.link}
            className="hover:underline text-blue-500"
            target="_blank"
          >
            {" "}
            {props.card.link}{" "}
          </a>
        )} */}
      </div>

      {/* tag container */}

      <div>
        <div className="flex flex-wrap gap-2">
          {props?.card?.tag &&
            props?.card?.tag.map((tag) => {
              return (
                <p
                  key={tag._id}
                  className="bg-purple-200 text-sm text-purple-600 rounded-full py-1 px-2"
                >
                  {tag.name}
                </p>
              );
            })}
        </div>

        <p className="text-slate-400 font-semibold mt-2">
          Added on - {createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Card;
