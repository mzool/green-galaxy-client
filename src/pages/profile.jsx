import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import theStore from "../store/store";
import LoadingSpinner from "../assets/loading";
import ConfirmEmail from "../components/auth/confirmEmail";
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

  //// rendering
  if (profilePage && confirmed) {
    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-screen-md mx-auto bg-white p-6 rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-4">Profile Page</h1>

          {/* Settings Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            {/* Add your settings content here */}
          </section>

          {/* Personal Information Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Personal Information
            </h2>
            {/* Add your personal information content here */}
          </section>

          {/* Dashboard Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            {/* Add your dashboard content here */}
          </section>
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
