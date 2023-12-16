import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import theStore from "../store/store";
import LoadingSpinner from "../assets/loading";
import ConfirmEmail from "../components/auth/confirmEmail";
import ProfileImag from "../assets/profileImag";
import Addressbook from "../assets/addressBook";
import LoveHeart from "../assets/loveHeart";
import Shield from "../assets/shield";
import List from "../assets/list";
import Chat from "../assets/chat";
import Sun from "../assets/sun";
import ProfilePageContents from "../components/profile page components/ProfilePageContents";
const ProfilePage = () => {
  /// get state
  const location = useLocation();
  const state = location.state;
  /// navigate
  const navigate = useNavigate();
  /// get the global store
  let store = useContext(theStore);
  /// no profile if the user not logged in
  let [profilePage, setProfilePage] = useState(false);
  /// if user email confirmed
  let [confirmed, setConfirmed] = useState(true);
  /// get user info
  useEffect(() => {
    if (store.store.user._id) {
      setConfirmed(store.store.user.confirm_email);
      if (confirmed) {
        setProfilePage(true);
      }
    } else
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_get_user_info
        }`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Authorization: `GreenBearer ${
              import.meta.env.VITE_authorization_token
            }`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data._id) {
            navigate("/login", { state: { ...state, prv: "/profile" } });
          } else {
            setConfirmed(data.confirm_email);
            if (data.confirm_email) {
              setProfilePage(true);
            }
          }
          store.store.updateUser(data);
        });
  }, []);
  /// section to render
  const [section, setSection] = useState("personalInfo");
  //// style
  const style = {
    sideBar:
      " bg-gray-100 p-4 rounded-lg shadow-lg sm:col-span-1 h-fit flex flex-col gap-2",
    sideBarContents:
      "w-full h-fit p-2 flex flex-row gap-4 rounded-lg items-center justify-start  text-black transition duration-300 cursor-pointer hover:bg-gray-200",
  };
  //// rendering
  if (profilePage && confirmed) {
    return (
      <div className="bg-white h-screen grid sm:grid-cols-4 grid-rows-2 gap-4">
        {/* side bar */}
        <div className={style.sideBar}>
          {/* personal information with update functions*/}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("personalInfo")}
          >
            <ProfileImag color={"black"} />
            <h2>my profile</h2>
          </div>
          {/* orders */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("allUserOrders")}
          >
            <List color={"black"} />
            <h2>mu orders</h2>
          </div>
          {/* address book */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("addressBook")}
          >
            <Addressbook color={"black"} />
            address book
          </div>
          {/* wish list */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("wishList")}
          >
            <LoveHeart color={"red"} />
            <h2>wish list</h2>
          </div>
          {/* security */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("security")}
          >
            <Shield color={"blue"} />
            <h2>security</h2>
          </div>
          {/* theme selection */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("theme")}
          >
            <Sun color={"orange"} />
            <h2>theme</h2>
          </div>
          {/* chat with us */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("chat")}
          >
            <Chat color={"green"} />
            <h2>chat with us</h2>
          </div>
        </div>
        {/* content */}
        <div className="bg-white sm:col-span-3">
          <ProfilePageContents section={section} />
        </div>
      </div>
    );
  } else if (confirmed === false) {
    return <ConfirmEmail />;
  } else {
    return <LoadingSpinner color={"green-500"} />;
  }
};

export default ProfilePage;
