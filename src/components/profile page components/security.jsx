import ProfileChangePassword from "./profileChangePassword";
import ConfirmEmail from "../auth/confirmEmail";
import theStore from "../../store/store.js";
import { useContext } from "react";
import EnableTowStepsLogin from "./enableTowStepsLogin.jsx";

function Security() {
  /// store
  const { store } = useContext(theStore);
  /// rendering
  return (
    <div className="h-fit min-h-screen w-full p-4 bg-white text-gray-700 flex flex-col gap-4">
      {/* confirm email address */}
      {!store.user?.confirm_email && <ConfirmEmail />}
      {/* change password */}
      <ProfileChangePassword />
      {/* enable tow step login */}
     <EnableTowStepsLogin store = {store}/>
    </div>
  );
}

export default Security;
