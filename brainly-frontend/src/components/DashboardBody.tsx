import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NotesContainer from "./NotesContainer";
import { setSignupData, setToken } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../utils/operations";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const DashboardBody = () => {
  // const token = useSelector((state)=> state.auth.token)

  const [currentTab, setCurrentTab] = useState("All");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchDetails = async () => {
    if (localStorage.getItem("token")) {
      const toastId = toast.loading("Hellllloooooo");
      const userDetails = await getUserDetails(localStorage.getItem("token"));
      dispatch(setSignupData(userDetails.data.user));
      toast.dismiss(toastId);
      if (!userDetails) {
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        // navigate("/dashboard");
        console.log("pending for now");
      }
    } else {
      navigate("/signin");
    }
  };
  // dispatch(setToken(token))
  // dispatch(setNotes(response?.data?.user?.content))
  // response.data.user.content = undefined

  // navigate("/dashboard")
  // console.log("first");
  useEffect(() => {
    fetchDetails();
  });

  return (
    <div className="flex max-h-[90vh] relative overflow-y-hidden">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <NotesContainer currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default DashboardBody;
