const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const apiEndpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    SIGNIN_API: BASE_URL + "/signin",
    USER_DETAILS_API:BASE_URL+ "/userDetails",
    CONTENT_API: BASE_URL + "/content",
    DELETE_NOTE_API: BASE_URL + "/delete",
    GET_SHARED_BRAIN_API: BASE_URL + "/shared/",
    CHANGE_BRAIN_PRIVACY_API: BASE_URL + "/share/"
  };