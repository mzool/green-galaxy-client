import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import theStore from "../store/store";
import LoadingSpinner from "../assets/loading";
import ProfileImag from "../assets/profileImag";
import Addressbook from "../assets/addressBook";
import LoveHeart from "../assets/loveHeart";
import Shield from "../assets/shield";
import List from "../assets/list";
import Chat from "../assets/chat";
import Sun from "../assets/sun";
import ProfilePageContents from "../components/profile page components/ProfilePageContents";
import getUser from "../functions/getUserInfo.js";
const ProfilePage = () => {
  /// navigate
  const navigate = useNavigate();
  /// get the global store
  const { store } = useContext(theStore);
  //// is fetching
  const [isFetching, setIsFetching] = useState(false);
  /// get user info
  useEffect(() => {
    if (!store.user._id) {
      setIsFetching(true);
      getUser()
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            store.updateUser(data.data);
          } else {
            navigate("/login");
          }
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
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
  if (store.user._id) {
    return (
      <div className="bg-white h-fit sm:grid sm:grid-cols-4 flex flex-col gap-4">
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
          {/* go to admin */}
          {store.user.permesions && (
            <div>
              <Link
                to={"/auth/admin"}
                className="bg-teal-600 text-white rounded-lg p-2 hover:bg-teal-800 hover:cursor-pointer"
              >
                Admin page
              </Link>
            </div>
          )}
        </div>
        {/* content */}
        <div className="bg-white sm:col-span-3">
          <ProfilePageContents section={section} />
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner color={"green-500"} />;
  }
};

export default ProfilePage;
