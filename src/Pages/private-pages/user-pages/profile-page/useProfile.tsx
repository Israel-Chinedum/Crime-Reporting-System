import { useEffect, useState } from "react";
import { useFetch } from "../../../../Hooks/useFetch";
import { useMessage } from "../../../../Hooks/useMessage";
import { useLoadAnimation } from "../../../../Hooks/useLoadAnimation";

type userProfileType = {
  fullname: { data: string; readonly: boolean };
  department: { data: string; readonly: boolean };
  email: { data: string; readonly: boolean };
  Matric_Number: { data: string; readonly: boolean };
  Phone_Number: { data: string; readonly: boolean };
  username: { data: string; readonly: boolean };
  createdAt?: string;
};

export const useProfile = () => {
  const { getRequest, postRequest } = useFetch();
  const { showMessage, closeMessage, getUserChoice } = useMessage();
  const { loadAnimation, setLoadAnimation, runLoadAnimation } =
    useLoadAnimation();
  const [userProfile, setUserProfile] = useState<userProfileType>({
    fullname: { data: "Unknown", readonly: true },
    department: { data: "Unknown", readonly: true },
    email: { data: "Unknown", readonly: true },
    Matric_Number: { data: "Unknown", readonly: true },
    Phone_Number: { data: "Unknown", readonly: true },
    username: { data: "Unknown", readonly: true },
  });
  const [selectImage, setSelectImage] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  // ====== SET PROFILE DETAILS DATA ======
  const setProfileData = (response: any) => {
    if (response) {
      const responseData = {
        fullname: { data: response.fullname, readonly: true },
        department: { data: response.department, readonly: true },
        email: { data: response.email, readonly: true },
        Matric_Number: { data: response.Matric_Number, readonly: true },
        Phone_Number: { data: response.Phone_Number, readonly: true },
        username: { data: response.username, readonly: true },
        createdAt: response.createdAt,
      };
      setUserProfile(responseData);
      localStorage.setItem("crsUserProfile", JSON.stringify(responseData));
    }
  };

  // ====== GET USER PROFILE ======
  const getUserProfile = async () => {
    showMessage({
      text: "Getting user profile...",
      status: "pending",
      timeout: null,
    });
    const getProfileDetails = async () => {
      const { error, response } = await getRequest("/user/get-user-profile");

      if (error) {
        showMessage({ text: error, status: "error" });
        return false;
      }

      return response;
    };

    // ====== get profile picture ======
    const getProfilePic = async () => {
      const { error, response } = await getRequest(
        "/user/get-user-profile-pic",
      );

      if (error) {
        console.log(error);
        setImgSrc("./favicon.svg");
      }
      if (response) {
        console.log(response);
        setImgSrc(response.url);
      }
    };

    await getProfilePic();
    const response = await getProfileDetails();
    setProfileData(response);
    closeMessage();
  };

  // ====== SEND UPDATED PROFILE DATA ======
  const sendUpdatedProfile = async () => {
    showMessage({
      text: "Enter your password",
      status: "normal",
      customRes: true,
    });
    let password;
    try {
      password = await getUserChoice();
    } catch {
      showMessage({ text: "Operation canceled!", status: "warning" });
      return;
    }

    setLoadAnimation({ state: true, message: "Updating profile data..." });
    const { error, response } = await postRequest({
      data: {
        fullname: userProfile.fullname.data,
        email: userProfile.email.data,
        department: userProfile.department.data,
        Matric_Number: userProfile.Matric_Number.data,
        Phone_Number: userProfile.Phone_Number.data,
        username: userProfile.username.data,
        password: password,
      },
      route: "/user/update-profile",
      type: "object",
    });

    if (error) {
      setLoadAnimation({ state: false });
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      setLoadAnimation({ state: false });
      console.log(response);
      setProfileData(response.message);
      showMessage({
        text: "Profile has been successfully updated",
        status: "success",
      });
    }
  };

  // ====== SEND OTP ======
  const sendOTP = async () => {
    setLoadAnimation({ state: true, message: "Sending OTP..." });

    const { error, response } = await postRequest({
      route: "/user/send-otp",
      data: { email: userProfile.email.data },
      type: "object",
    });

    if (error) {
      setLoadAnimation({ state: false });
      showMessage({ text: error, status: "error" });
    }

    if (response) {
      setLoadAnimation({ state: false });
      showMessage({ text: response.message, status: "success" });
      setTimeout(async () => {
        showMessage({ text: "Enter OTP", status: "normal", customRes: true });
        const otp = await getUserChoice();
        showMessage({
          text: "Enter new password",
          status: "normal",
          customRes: true,
        });
        const password = await getUserChoice();

        setLoadAnimation({ state: true, message: "Updating user password..." });
        const { error, response } = await postRequest({
          route: "/user/update-password",
          data: { email: userProfile.email.data, otp, password },
          type: "object",
        });

        if (error) {
          setLoadAnimation({ state: false });
          showMessage({ text: error, status: "error" });
        }

        if (response) {
          setLoadAnimation({ state: false });
          showMessage({ text: response.message, status: "success" });
        }
      }, 3000);
    }
  };

  useEffect(() => {
    getUserProfile();
    return () => {
      closeMessage();
    };
  }, []);

  return {
    userProfile,
    setUserProfile,
    selectImage,
    setSelectImage,
    imgSrc,
    setImgSrc,
    loadAnimation,
    runLoadAnimation,
    sendUpdatedProfile,
    sendOTP,
  };
};
