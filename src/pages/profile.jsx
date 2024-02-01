import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import theStore from "../store/store";
import LoadingSpinner from "../assets/loading";
import ProfileImag from "../assets/profileImag";
import Shield from "../assets/shield";
import List from "../assets/list";
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
    sideBarContents:
      " py-2 px-4 flex flex-row gap-2 rounded-md transition duration-300 cursor-pointer hover:bg-gray-500",
  };


  //// rendering
  if (store.user._id) {
    return (
      <div className="bg-white h-fit flex flex-col gap-2 ">
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
            <Link
              to={"/auth/admin"}
              className="bg-gray-700 text-white rounded-md p-2 hover:bg-gray-500 hover:cursor-pointer w-full text-center"
            >
              Admin page
            </Link>
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
