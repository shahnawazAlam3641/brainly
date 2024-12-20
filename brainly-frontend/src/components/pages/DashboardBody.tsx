// import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import Sidebar from "../core/Sidebar";
import NotesContainer from "../core/NotesContainer";
import { setSignupData } from "../../slices/authSlice";
import { getUserDetails } from "../../utils/operations";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const DashboardBody = () => {
  const [currentTab, setCurrentTab] = useState("All");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchDetails = async () => {
    if (localStorage.getItem("token")) {
      const toastId = toast.loading("Loading");
      const userDetails = await getUserDetails(localStorage.getItem("token"));
      dispatch(setSignupData(userDetails.data.user));
      toast.dismiss(toastId);

      if (!userDetails) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="flex max-h-[90vh] relative overflow-y-hidden">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <NotesContainer currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default DashboardBody;
