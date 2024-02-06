import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import theStore from "../store/store";
import LoadingSpinner from "../assets/loading";
import ProfileImag from "../assets/profileImag";
import Shield from "../assets/shield";
import List from "../assets/list";
import ProfilePageContents from "../components/profile page components/ProfilePageContents";
import getUser from "../functions/getUserInfo.js";
import AuthAdmin from "../components/admin/authAdmin.jsx"
import TagsForSEO from "../components/utilities/reactHelmet.jsx"

const ProfilePage = () => {
  const [a, auth] = useState(false);
  /// navigate
  const navigate = useNavigate();
  /// get the global store
  const { store } = useContext(theStore);
  //// is fetching
  const [isFetching, setIsFetching] = useState(false);
  /// get user info
  useEffect(() => {
    window.scrollTo(0, 0);
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
    sideBarContents:
      " py-2 px-4 flex flex-row gap-2 rounded-md transition duration-300 cursor-pointer hover:bg-gray-500",
  };


  //// rendering
  if(a){
    return <AuthAdmin auth={auth}/>
  }
  if (store.user._id) {
    return (
      <div className="bg-white h-fit flex flex-col gap-2 ">
        <TagsForSEO
          title={"Profile Page"}
          pageURL={"https://green-galaxy.net/profile"}
          descriptionOfThePage={
            "profile page for user, you can controll your preferences, tracking orders and controlling your profile security from here."
          }
          urlToImageDescripeThePage={""}
        />
        {/* side bar */}
        <div className="bg-gray-700 flex gap-2 flex-row flex-wrap h-fit w-full items-center justify-center p-2 text-white">
          {/* personal information with update functions*/}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("personalInfo")}
          >
            <ProfileImag color={"white"} />
            <h2>my profile</h2>
          </div>
          {/* orders */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("allUserOrders")}
          >
            <List color={"white"} />
            <h2>my orders</h2>
          </div>

          {/* security */}
          <div
            className={style.sideBarContents}
            onClick={() => setSection("security")}
          >
            <Shield color={"white"} />
            <h2>security</h2>
          </div>
          {/* go to admin */}
          {(store.user.permesions == "admin" ||
            store.user.permesions == "superAdmin") && (
            <button
              className="bg-gray-700 text-white rounded-md p-2 hover:bg-gray-500 hover:cursor-pointer w-full text-center"
              onClick={() => {
                auth(true);
              }}
            >
              Admin page
            </button>
          )}
        </div>
        {/* content */}
        <div className="bg-white">
          <ProfilePageContents section={section} />
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner color={"green-500"} />;
  }
};

export default ProfilePage;
