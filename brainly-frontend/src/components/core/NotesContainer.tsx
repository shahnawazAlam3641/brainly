// import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import ShareIcon from "../../svgs/ShareIcon";
import PlusIcon from "../../svgs/PlusIcon";
import Card from "../common/Card";
import {
  addCard,
  changeBrainPrivacy,
  getUserNotes,
} from "../../utils/operations";
import { useDispatch, useSelector } from "react-redux";
import { NoteDoc, pushNote, setNotes } from "../../slices/notesSlice";
import { setSignupData } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { RootState } from "../../reducer";
import { FieldValues } from "react-hook-form";
import ShareModal from "../modals/ShareModal";
import AddContentModal from "../modals/AddContentModal";

interface propsData {
  currentTab: string;
  setCurrentTab: (data: string) => void;
}

const NotesContainer = (props: propsData) => {
  const { currentTab } = props;

  const [cardsToShow, setCardsToShow] = useState<NoteDoc[]>([]);

  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.auth.signupData);
  const token = useSelector((state: RootState) => state.auth.token);
  const content = useSelector((state: RootState) => state.notes.content);

  const [addModal, setAddModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  const [privacy, setPrivacy] = useState("");

  const handleAddContent = async (data: FieldValues) => {
    const toastId = toast.loading("Creating new note");

    const tags = data.Tag.split(",")
      .map((elem: string) => elem.trim())
      .filter((elem: string) => elem !== "");

    const payload = {
      title: data.Title,
      link: data.Link,
      type: data.Type,
      tags: tags,
    };

    try {
      const createdContent = await addCard(payload, token);
      dispatch(pushNote(createdContent?.data?.content));
      setAddModal(false);
      toast.dismiss(toastId);
      toast.success("New note created successfully");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Something went wrong while creating new note");
    }
  };

  const fetchUserNotes = async () => {
    const toastId = toast.loading("Fetching Notes");
    try {
      const allNotes = await getUserNotes(token);
      dispatch(setNotes(allNotes?.data?.contents));
      // setCardsToShow(allNotes?.data?.contents);

      toast.dismiss(toastId);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      // toast.error(error.response.data.message);
    }
  };

  const updatePrivacyHandler = async () => {
    let isPrivate;
    if (privacy == "Restricted") {
      isPrivate = true;
    } else if (privacy == "Anyone with link") {
      isPrivate = false;
    }

    const toastId = toast.loading("Saving Changes");

    if (currentUser && (isPrivate == false || isPrivate == true)) {
      try {
        const response = await changeBrainPrivacy(
          currentUser?._id,
          isPrivate,
          token
        );
        if (response.data.success == true) {
          dispatch(setSignupData(response.data.user));
        }
        console.log(response);
        setPrivacyModal(false);
        setAddModal(false);
        setShareModal(false);
        toast.dismiss(toastId);
        toast.success("Changes Saved");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong, Brain privacy not changed");
      }
    }
  };

  useEffect(() => {
    if (currentUser && currentUser?.isPrivate) {
      setPrivacy("Restricted");
    } else {
      setPrivacy("Anyone with link");
    }
  }, [currentUser]);

  useEffect(() => {
    fetchUserNotes();
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
  }, [currentTab, content]);

  return (
    <>
      <div className="flex flex-col gap-5 w-full overflow-y-auto bg-slate-50 overflow-x-hidden">
        <div className="flex justify-between items-center gap-8 w-full p-8">
          <p className="text-xl md:text-3xl unde font-medium text-slate-700">
            {currentTab}
          </p>
          <div className=" flex flex-col md:flex-row gap-4">
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
        {cardsToShow.length == 0 && (
          <p className="text-2xl text-slate-700 p-8">
            No content to Show. Add one now
          </p>
        )}

        <div className="columns-1 md:columns-2 lg:columns-3 max-[1080px] mx-auto gap-5 py-5  px-8">
          {/* card */}
          {cardsToShow.map((card) => {
            return (
              <div key={card._id}>
                <Card token={token} card={{ ...card }} />
              </div>
            );
          })}
        </div>
      </div>

      {shareModal && (
        <ShareModal
          privacy={privacy}
          setPrivacy={setPrivacy}
          privacyModal={privacyModal}
          setPrivacyModal={setPrivacyModal}
          setShareModal={setShareModal}
          updatePrivacyHandler={updatePrivacyHandler}
        />
      )}

      {addModal && (
        <AddContentModal
          handleAddContent={handleAddContent}
          setAddModal={setAddModal}
        />
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
