import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
import { getSharedBrain } from "../utils/operations";
import { useSelector } from "react-redux";
import Card from "./Card";

const SharedBrain = () => {
  const token = useSelector((state) => state.auth.token);

  console.log(token);
  const { id } = useParams();

  const [brain, setBrain] = useState(null);

  console.log(brain);

  const fetchBrainDetails = async () => {
    const response = await getSharedBrain(id);
    console.log("firstfirstfirstfirstfirstfirst");
    console.log(response.data.isPrivate);

    if (response.data.isPrivate) {
      setBrain(response.data);
    } else {
      console.log(response);
      setBrain(response.data.user);
    }
  };

  useEffect(() => {
    fetchBrainDetails();
  }, [id]);

  return (
    <div className="flex flex-col p-5 bg-slate-50">
      {!brain ? (
        <div>Loadinggggg</div>
      ) : brain.isPrivate ? (
        <div>The brain you are trying to access is Private</div>
      ) : (
        <>
          <p className="text-slate-700 text-2xl font-semibold px-4">{`Welcome to ${brain.name}'s Brain👋`}</p>
          <div className="columns-1 md:columns-2 lg:columns-3 max-[1080px] mx-auto gap-5 py-5  px-8">
            {/* card */}
            {brain.content.map((card) => {
              return (
                <Card
                  key={card._id}
                  isShared={true}
                  token={token}
                  card={{ ...card }}
                  className="mb-5 break-inside-avoid"
                />
              );
            })}
            {/* <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/> */}
          </div>
        </>
      )}
    </div>
  );
};

export default SharedBrain;
