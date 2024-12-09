import React, { useEffect, useState } from "react";
import Button from "./Button";
import ShareIcon from "../svgs/ShareIcon";
import PlusIcon from "../svgs/PlusIcon";
import Card from "./Card";
import { addCard, changeBrainPrivacy, getUserNotes } from "../utils/operations";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { pushNote, setNotes } from "../slices/notesSlice";
import { useLocation } from "react-router";
import LockIcon from "../svgs/LockIcon";
import DropdownIcon from "../svgs/DropdownIcon";
import LinkIcon from "../svgs/LinkIcon";
import { setSignupData } from "../slices/authSlice";

const NotesContainer = ({ currentTab, setCurrentTab }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [currentTab, setCurrentTab] = useState(null)

  const [cardsToShow, setCardsToShow] = useState([]);

  const dispatch = useDispatch();

  const currenUser = useSelector((state) => state.auth.signupData);
  console.log(currenUser);
  const token = useSelector((state) => state.auth.token);
  const content = useSelector((state) => state.notes.content);

  const [addModal, setAddModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  const [privacy, setPrivacy] = useState("");

  const handleAddContent = async (data) => {
    console.log(data);
    const tags = data.Tag.split(",").map((elem) => elem.trim());
    console.log(tags);
    const payload = {
      title: data.Title,
      link: data.Link,
      type: data.Type,
      tags: tags,
    };

    const createdContent = await addCard(payload, token);
    dispatch(pushNote(createdContent?.data?.content));
    setAddModal(false);
    console.log(createdContent);
  };

  const fetchUserNotes = async () => {
    const allNotes = await getUserNotes(token);
    dispatch(setNotes(allNotes?.data?.contents));
  };

  const updatePrivacyHandler = async () => {
    let isPrivate;
    console.log(privacy);
    if (privacy == "Restricted") {
      isPrivate = true;
    } else {
      isPrivate = false;
    }

    const response = await changeBrainPrivacy(currenUser._id, isPrivate, token);
    if (response.data.success == true) {
      dispatch(setSignupData(response.data.user));
    }
    console.log(response);
  };

  useEffect(() => {
    fetchUserNotes();
    console.log(currenUser);

    if (currenUser && currenUser.isPrivate) {
      setPrivacy("Restricted");
    } else {
      setPrivacy("Anyone with link");
    }
  }, []);

  useEffect(() => {
    if (currentTab == "All") {
      setCardsToShow(content);
    } else {
      const filteredCards = content.filter((card) => {
        return card.type == currentTab;
      });

      setCardsToShow(filteredCards);
    }
  }, [currentTab]);

  return (
    <>
      <div className="flex flex-col gap-5 w-full overflow-y-auto  overflow-x-hidden">
        <div className="flex justify-between w-full p-8">
          <p className="text-3xl font-medium text-slate-700">All Notes</p>
          <div className=" flex gap-4">
            <Button
              onPress={() => setShareModal(true)}
              startIcon={<ShareIcon />}
              text={"Share Brain"}
              isPrimary={false}
            />
            <Button
              onPress={() => setAddModal(true)}
              startIcon={<PlusIcon />}
              text={"Add Content"}
              isPrimary={true}
            />
          </div>
        </div>

        {/* {card container} */}
        {content.length == 0 && (
          <p className="text-2xl text-slate-700 p-8">
            {" "}
            No content Show.....Add one now
          </p>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 px-8">
          {/* card */}
          {cardsToShow.map((card) => {
            return <Card token={token} card={{ ...card }} />;
          })}
          {/* <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/> */}
        </div>
      </div>

      {shareModal && (
        <div className="absolute p-6 w-96 max-w-[85vw] rounded-md z-30 flex flex-col gap-5 top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white shadow-black shadow-2xl">
          <p>General Access</p>
          <div>
            <input
              className="border w-full border-purple-200 border-solid  py-2 px-4  rounded-md"
              type="text"
              value={
                window.location.href.replace("dashboard", "share") +
                "/" +
                currenUser?._id
              }
            />

            <div className="flex gap-1 p-2">
              <LockIcon />
              <div className="flex flex-col ">
                <div
                  onClick={() => setPrivacyModal(!privacyModal)}
                  className="relative flex gap-1 text-slate-700 cursor-pointer hover:bg-slate-100 px-3  w-fit"
                >
                  <span>{privacy}</span>

                  <DropdownIcon />
                </div>
                {privacyModal && (
                  <div className="absolute z-50 flex flex-col   bg-white border shadow-lg top-[55%] w-[200px] p-2 shadow-black">
                    <p
                      onClick={(e) => {
                        setPrivacy(e.target.innerText);
                        setPrivacyModal(false);
                      }}
                      className="hover:bg-slate-200 p-2 rounded-sm transition-all duration-200"
                    >
                      Restricted
                    </p>
                    <p
                      onClick={(e) => {
                        setPrivacy(e.target.innerText);
                        setPrivacyModal(false);
                      }}
                      className="hover:bg-slate-200 p-2 rounded-sm transition-all duration-200"
                    >
                      Anyone with link
                    </p>
                  </div>
                )}
                <p className="text-slate-400 text-sm -mt-1 px-3  w-fit">
                  {privacy == "Restricted"
                    ? "No one can access your brain"
                    : "Only people with link can access your brain"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between p-2">
            <Button
              onPress={() =>
                navigator.clipboard.writeText(
                  window.location.href.replace("dashboard", "share") +
                    "/" +
                    currenUser?._id
                )
              }
              text="Copy Link"
              isPrimary={false}
              startIcon={<LinkIcon />}
            />
            <Button
              onPress={() => updatePrivacyHandler()}
              text="Save Changes"
              isPrimary={true}
            />
          </div>
        </div>
      )}

      {addModal && (
        <div className="absolute p-6  rounded-md z-30  top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white shadow-black shadow-2xl">
          <div className="relative">
            <form
              className="flex flex-col justify-center items-center  gap-4 p-5"
              onSubmit={handleSubmit((data) => handleAddContent(data))}
            >
              <input
                className="border border-purple-200 border-solid  py-2 px-4  rounded-md"
                placeholder="Title"
                type="text"
                {...register("Title", { required: true })}
              />
              {errors.Name && <p>Title is required.</p>}

              <input
                className="border border-purple-200 border-solid py-2 px-4  rounded-md"
                placeholder="Link"
                type="text"
                {...register("Link", { required: true })}
              />
              {errors.Link && <p>Link name is required.</p>}

              <select
                className=" border border-purple-200 border-solid  py-2 px-4  rounded-md w-full"
                {...register("Type", { required: true })}
              >
                <option>Twitter(X)</option>
                <option>Youtube</option>
                <option>Document</option>
                <option>Link</option>
              </select>

              <input
                className="border border-purple-200 border-solid py-2 px-4  rounded-md"
                placeholder="Enter Tag - Comma (,) seperated"
                type="text"
                {...register("Tag", { required: false })}
              />

              <div className="flex">
                <Button isPrimary={true} text={"Add Note"} />
              </div>
            </form>

            <p
              onClick={() => setAddModal(false)}
              className="text-slate-700 cursor-pointer absolute -top-5 -right-3 text-xl"
            >
              X
            </p>
          </div>
        </div>
      )}
      {(shareModal || addModal) && (
        <div
          onClick={() => {
            setAddModal(false);
            setShareModal(false);
            setPrivacyModal(false);
          }}
          className="absolute z-20 -top-20 left-0 right-0 -bottom-20 bg-[#0000005a]"
        ></div>
      )}
    </>
  );
};

export default NotesContainer;
