// import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSharedBrain } from "../../utils/operations";
import { useSelector } from "react-redux";
import Card from "../common/Card";
import { RootState } from "../../reducer";
import { NoteDoc } from "../../slices/notesSlice";
import toast from "react-hot-toast";
import Shimmer from "../common/Shimmer";

interface sharedBrainData {
  _id: string;
  name: string;
  email: string;
  isPrivate: boolean;
  content: NoteDoc[];
}

const SharedBrain = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  console.log(token);
  const { id } = useParams();

  const [brain, setBrain] = useState<sharedBrainData>();

  console.log(brain);

  const fetchBrainDetails = async () => {
    const toastId = toast.loading("Loading");
    try {
      if (id) {
        const response = await getSharedBrain(id);
        // console.log("firstfirstfirstfirstfirstfirst");
        console.log(response.data.isPrivate);

        if (response.data.isPrivate) {
          console.log(response.data);
          setBrain(response.data);
        } else {
          console.log(response);
          setBrain(response.data.user);
        }

        toast.dismiss(toastId);
      } else {
        toast.error("Invalid Link, Could not get Brain details");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBrainDetails();
  }, [id]);

  return (
    <div className="flex flex-col p-5 h-[90vh] bg-slate-50">
      {!brain ? (
        <div className="columns-1 md:columns-2 lg:columns-3 max-[1080px] mx-auto gap-5 py-5  px-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      ) : brain.isPrivate ? (
        <p className="text-2xl font-bold text-center text-slate-800 ">
          The brain you are trying to access is Private
        </p>
      ) : (
        <>
          <p className="text-slate-700 text-2xl font-semibold px-4">{`Welcome to ${brain.name}'s Brain👋`}</p>
          <div className="columns-1 md:columns-2 lg:columns-3 max-[1080px] mx-auto gap-5 py-5  px-8">
            {/* card */}
            {brain.content.map((card) => {
              return (
                <div key={card._id}>
                  <Card isShared={true} token={token} card={{ ...card }} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SharedBrain;
