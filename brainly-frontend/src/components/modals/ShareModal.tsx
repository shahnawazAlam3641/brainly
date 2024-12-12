import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";
import LockIcon from "../../svgs/LockIcon";
import GlobeIcon from "../../svgs/GlobeIcon";
import DropdownIcon from "../../svgs/DropdownIcon";
import Button from "../Button";
import toast from "react-hot-toast";
import LinkIcon from "../../svgs/LinkIcon";

interface propsData {
  privacy: string;
  setPrivacy: (data: string) => void;
  privacyModal: boolean;
  setPrivacyModal: (data: boolean) => void;
  setShareModal: (data: boolean) => void;
  updatePrivacyHandler: () => void;
}

const ShareModal = (props: propsData) => {
  const {
    privacy,
    setPrivacy,
    privacyModal,
    setPrivacyModal,
    setShareModal,
    updatePrivacyHandler,
  } = props;

  const currentUser = useSelector((state: RootState) => state.auth.signupData);

  return (
    <div className="absolute p-6 w-96 max-w-[85vw] rounded-md z-30 flex flex-col gap-5 top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white shadow-black shadow-2xl">
      <p
        onClick={() => {
          setShareModal(false);
          setPrivacyModal(false);
        }}
        className="text-slate-700 cursor-pointer absolute top-1 right-3 text-xl"
      >
        X
      </p>
      <p>General Access</p>
      <div>
        <input
          className="border w-full border-purple-200 border-solid text-slate-600 py-2 px-4  rounded-md"
          type="text"
          value={
            window.location.href.replace("dashboard", "share") +
            "/" +
            currentUser?._id
          }
        />

        <div className="flex gap-1 p-2">
          {privacy == "Restricted" ? <LockIcon /> : <GlobeIcon />}

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
                    const target = e.target as HTMLElement;
                    setPrivacy(target.innerText);
                    setPrivacyModal(false);
                  }}
                  className="hover:bg-slate-200 p-2 rounded-sm transition-all duration-200"
                >
                  Restricted
                </p>
                <p
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    setPrivacy(target.innerText);
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
          onPress={() => {
            navigator.clipboard.writeText(
              window.location.href.replace("dashboard", "share") +
                "/" +
                currentUser?._id
            );
            toast.success("Link Copied  ");
          }}
          text="Copy Link"
          isPrimary={false}
          startIcon={<LinkIcon />}
        />
        <Button
          onPress={() => {
            updatePrivacyHandler();
          }}
          text="Save Changes"
          isPrimary={true}
        />
      </div>
    </div>
  );
};

export default ShareModal;
