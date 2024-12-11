import React, { useEffect } from "react";
import BrainIcon from "../svgs/BrainIcon";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { Link, useNavigate } from "react-router";
import { getUserDetails } from "../utils/operations";
import { setSignupData, setToken } from "../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.signupData);

  const checkUser = async () => {
    if (localStorage.getItem("token") && !userInfo) {
      const user = await getUserDetails(localStorage.getItem("token"));
      // console.log(user)
      dispatch(setSignupData(user?.data?.user));
    }
    // else{
    //   navigate("/signin")
    // }
  };

  const logoutHandler = () => {
    dispatch(setSignupData(null));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="flex justify-between items-center shadow-lg z-10 relative px-8 ">
      <div className="flex items-center gap-4  min-h-[10vh] ">
        <BrainIcon />
        <p className="text-3xl font-semibold text-slate-700">Brainly</p>
      </div>

      {!userInfo ? (
        <Link to={"/signin"}>
          <Button isPrimary={true} text="Sign In Now" />
        </Link>
      ) : (
        <div className="flex gap-4 items-center">
          <p>{userInfo.name}</p>{" "}
          <Button onPress={logoutHandler} isPrimary={false} text="Logout" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
