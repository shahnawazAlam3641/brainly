// import React, { useEffect } from "react";
import { useEffect } from "react";
import BrainIcon from "../../svgs/BrainIcon";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router";
import { getUserDetails } from "../../utils/operations";
import { setSignupData, setToken } from "../../slices/authSlice";
import DropdownIcon from "../../svgs/DropdownIcon";
import { RootState } from "../../reducer";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.signupData);

  const checkUser = async () => {
    if (localStorage.getItem("token") && !userInfo) {
      const toastId = toast.loading("Fetching User details");
      try {
        const user = await getUserDetails(localStorage.getItem("token"));
        dispatch(setSignupData(user?.data?.user));
        toast.dismiss(toastId);
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
      }
    }
    // else{
    //   navigate("/signin")
    // }
  };

  const logoutHandler = () => {
    navigate("/signin");
    dispatch(setSignupData(null));
    dispatch(setToken(null));
    localStorage.removeItem("token");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="flex justify-between items-center shadow-lg z-10 relative px-8 ">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-4  min-h-[10vh] cursor-pointer "
      >
        <BrainIcon />
        <p className="text-xl md:text-3xl font-semibold text-slate-700">
          Brainly
        </p>
      </div>

      {!userInfo ? (
        <Link to={"/signin"}>
          <Button isPrimary={true} text="Sign In Now" />
        </Link>
      ) : (
        <div className="relative flex gap-4 group items-center">
          <p className="flex gap-2 font-bold cursor-pointer text-slate-600 justify-center items-center  px-2 py-1 rounded">
            {userInfo.name} <DropdownIcon />
          </p>
          <div className="absolute top-full right-0  px-1 bg-white hidden group-hover:block shadow-black shadow-sm">
            {/* <Button onPress={logoutHandler} isPrimary={false} text="Logout" /> */}

            <p
              onClick={() => navigate("/")}
              className="p-1 px-3 my-1 transition-all duration-200 rounded-sm hover:bg-slate-200 cursor-pointer bg-white "
            >
              Home
            </p>
            <p
              onClick={() => navigate("/dashboard")}
              className="p-1 px-3 my-1 transition-all duration-200 rounded-sm hover:bg-slate-200 cursor-pointer bg-white "
            >
              Dashboard
            </p>
            <p
              onClick={logoutHandler}
              className="p-1 px-3 my-1 transition-all duration-200 rounded-sm hover:bg-slate-200 cursor-pointer bg-white "
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
