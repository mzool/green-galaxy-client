import ImagePlaceHolder from "../../assets/imagePlaceHolde";
import theStore from "../../store/store.js";
import { useState, useContext, useRef, useEffect } from "react";
import postImage from "../../functions/updateProfileImage.js";
import Loader from "../loader";
function PersonalInfoProfile() {
  /// get the store
  const { store } = useContext(theStore);
  /// open input
  const fileInput = useRef();
  function openImageInput() {
    fileInput.current.click();
  }
  /// new image src
  const [src, setSrc] = useState(store.user.profileImage);
  //// message
  const [message, setMessage] = useState({ msg: "", err: "" });
  //// is updating
  const [updating, isUpdating] = useState(false);
  /// get image from input
  const [profileImage, setProfileImage] = useState("");
  /// fetch to server when profile image change
  useEffect(() => {
    if (profileImage) {
      isUpdating(true);
      postImage(profileImage, setMessage, setSrc);
    }
  }, [profileImage]);
  /// control updating
  useEffect(() => {
    isUpdating(false);
  }, [message]);
  /// if updating
  if (updating) {
    return <Loader />;
  }
  /// style
  const style = {
    parent:
      "grid grid-cols-2 gap-2 bg-white w-full h-fit p-4 text-green-600 items-center justify-center",
    personal:
      "bg-gray-50 rounded-lg p-4 w-full h-full flex flex-col gap-2 items-start justify-center",
    readOnlyInputs: "outline-0 border-2 border-zinc-300 rounded-lg p-2 w-full",
    passInput: "p-2 rounded-lg",
  };

  ///rendering
  return (
    <div className={style.parent}>
      {message && (
        <div className="bg-white flex text-center p-2 text-green-600">
          {message.msg}
        </div>
      )}
      {message && (
        <div className="bg-white flex text-center p-2 text-red-600">
          {message.err}
        </div>
      )}

      {/* personal information and profile image */}
      <div className={style.personal}>
        {/* profile image */}
        <div>
          {src ? (
            <img
              src={src}
              alt={store.user.name}
              className="w-24 h-24 sm:w-36 sm:h-36 rounded-full mb-2 "
            />
          ) : (
            <ImagePlaceHolder width={36} height={36} color={"gray"} />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInput}
            onChange={(e) => {
              setProfileImage(e.target.files[0]);
            }}
          />
          <button
            disabled={updating}
            className="bg-gray-500 text-white p-1 rounded-lg text-xs hover:bg-gray-600 transition duration-300"
            onClick={openImageInput}
          >
            change profile image
          </button>
        </div>
        {/* user name */}
        <div className="w-full">
          <h2>user name:</h2>
          <input
            type="text"
            readOnly
            value={store.user.name}
            className={style.readOnlyInputs}
          />
        </div>
        {/* email */}
        <div className="w-full">
          <h2>email:</h2>
          <input
            type="email"
            readOnly
            value={store.user.email}
            className={style.readOnlyInputs}
          />
        </div>
        {/* phone number */}
        <div className="w-full">
          <h2>phone:</h2>
          <input
            type="text"
            readOnly
            value={store.user.phone}
            className={style.readOnlyInputs}
          />
        </div>
      </div>
      {/* here the div contain 2 sections as to rows */}
      <div className="w-full grid grid-rows-2 gap-2 h-full">
        {/* change password  */}
        <div className="bg-teal-50 h-fit w-full p-2 flex flex-col gap-2 rounded-lg">
          <h2>Change Password:</h2>
          <form className=" flex flex-col gap-2 ">
            <input
              type="password"
              placeholder="new password"
              className={style.passInput}
            />
            <input
              type="password"
              placeholder="confirm password"
              className={style.passInput}
            />
            <input
              type="password"
              placeholder="current password"
              className={style.passInput}
            />
            <input
              type="submit"
              value={"change password"}
              className="border-2 border-teal-500 rounded-lg bg-white w-fit py-1 px-4 hover:bg-green-50"
            />
          </form>
        </div>
        {/* affiliate rank */}
        <div className="w-full bg-green-50 rounded-lg p-2 h-fit flex flex-col gap-2">
          <h2>Your Affiliate Score:</h2>
          <input type="text" readOnly className={style.readOnlyInputs} value={store.user.affiliate}/>
          <p className="text-xs">* You can win points on: orders, reviews and comments on blogs</p>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoProfile;
