import { useEffect, useState } from "react";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import SignGraphic from "../../assets/LoginGraphic.svg";
import { apiConnector } from "../../utils/apiConnector";
import { useNavigate } from "react-router";
import { FieldValues } from "react-hook-form";
import { setSignupData, setToken } from "../../slices/authSlice";
import { setNotes } from "../../slices/notesSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { apiEndpoints } from "../../utils/apiEndpoints";

// interface sign {
//   Name?: string;
//   Email: string;
//   Password: string;
// }

const Sign = () => {
  // const profile = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSigninPage, setIsSigninPage] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const signup = async(formdata:sign)=>{
  //   const data = await axios.post("http://localhost:4000/api/v1/signup", {name:formdata.name,email:formdata.email,passsword:formdata.password})
  //   console.log(data)
  // }

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
      // const userDetails = await getUserDetails(token)
      // console.log(userDetails)

      // dispatch(setToken(token))
      // // dispatch(setNotes(response?.data?.user?.content))
      // // response.data.user.content = undefined
      // dispatch(setSignupData(userDetails?.data?.user))
      // navigate("/dashboard")
      // console.log("first")
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const sign = async (formdata: FieldValues) => {
    if (isSigninPage) {
      // console.log(formdata);

      const toastId = toast.loading("Logging In");

      try {
        const response = await apiConnector("POST", apiEndpoints.SIGNIN_API, {
          email: formdata.Email,
          password: formdata.Password,
        });
        // console.log(response);
        const token = response?.data?.token;

        localStorage.setItem("token", token);
        dispatch(setToken(token));
        dispatch(setNotes(response?.data?.user?.content));
        // response.data.user.content = undefined
        dispatch(setSignupData(response?.data?.user));
        navigate("/dashboard");

        toast.dismiss(toastId);
        toast.success("Login Successfull");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);
      }
    } else {
      // console.log(formdata);

      const toastId = toast.loading("Logging In");

      try {
        const response = await apiConnector("POST", apiEndpoints.SIGNUP_API, {
          name: formdata.Name,
          email: formdata.Email,
          password: formdata.Password,
        });
        // if (!response.data.success) {
        //   console.log("response is false");
        //   toast.dismiss(toastId);
        // } else {
        //   console.log("response is true");
        //   toast.dismiss(toastId);
        //   toast.error(response.data.messsage);
        // }
        // console.log(response);
        const token = response?.data?.token;

        localStorage.setItem("token", token);
        dispatch(setToken(token));
        dispatch(setNotes(response?.data?.user?.content));
        response.data.user.content = undefined;
        dispatch(setSignupData(response?.data?.user));
        navigate("/dashboard");
        toast.dismiss(toastId);
        toast.success("Sign Up Successfull");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className=" py-4 flex overflow-y-hidden h-[90vh] w-[100vw] overflow-x-hidden justify-between gap-5 items-center bg-slate-50">
      <img src={SignGraphic} className="hidden md:block max-w-[50vw] mx-auto" />

      <div className="min-w-[50%] mx-auto">
        <div className="flex flex-col justify-center mx-auto bg-white border rounded-md shadow px-4 py-12 items-center max-w-80">
          <p className="text-2xl font-semibold text-slate-600">
            {isSigninPage ? "Sign In" : "Sign Up"}
          </p>
          {/* <form className='flex flex-col max-w-96 gap-2 bg-red-200'>
            {!isSigninPage && <input type='text'/>}
            <input type='email'/>
            <input type='password'/>
            <Button isPrimary={true} text={isSigninPage ? "Sign in" : "Sign Up"} />
          </form> */}

          <form
            className="flex flex-col justify-center items-center  gap-2 p-5"
            onSubmit={handleSubmit((data) => sign(data))}
          >
            {!isSigninPage && (
              <input
                className="border border-purple-200 border-solid  py-2 px-4  rounded-md"
                placeholder="Name"
                type="text"
                {...register("Name", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                })}
              />
            )}
            {errors.Name && (
              <p className="text-red-300">
                Name must be at least 3 characters long
              </p>
            )}
            <input
              className="border border-purple-200 border-solid py-2 px-4  rounded-md"
              placeholder="Email"
              type="email"
              {...register("Email", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Email must be at least 5 characters long",
                },
              })}
            />
            {errors.Email && (
              <p className="text-red-300">
                Email must be at least 5 characters long
              </p>
            )}
            <input
              className="border border-purple-200 border-solid py-2 px-4  rounded-md"
              placeholder="Password"
              type="password"
              {...register("Password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.Password && (
              <p className="text-red-300">
                Password must be at least 8 characters long
              </p>
            )}
            <Button
              isPrimary={true}
              text={isSigninPage ? "Sign in" : "Sign Up"}
            />
          </form>

          <p
            className="cursor-pointer text-slate-500"
            onClick={() => setIsSigninPage(!isSigninPage)}
          >
            {isSigninPage
              ? "New to Brainly? Sign Up Now"
              : "Already Registered? Sign In Now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sign;
