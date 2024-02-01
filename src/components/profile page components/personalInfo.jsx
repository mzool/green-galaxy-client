import ImagePlaceHolder from "../../assets/imagePlaceHolde";
import theStore from "../../store/store.js";
import { useState, useContext, useRef, useEffect } from "react";
import postImage from "../../functions/updateProfileImage.js";

function PersonalInfoProfile() {
  /// get the store
  const { store } = useContext(theStore);
  /// open input
  const fileInput = useRef();
  function openImageInput() {
    fileInput.current.click();
  }
  const confirmEmailDialog = useRef(null);
  /// new image src
  const [src, setSrc] = useState(store.user.profileImage);
  const imageDialog = useRef(null);
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
  /// style
  const style = {
    parent: "flex flex-col gap-2 p-4 text-gray-700",
    personal:
      "bg-gray-100 rounded-md p-4 w-full h-full flex flex-col gap-2 items-start justify-center",
    readOnlyInputs:
      "outline-0 border border-gray-200 rounded-md px-4 py-2 w-full",
    passInput: "p-2 rounded-lg",
  };

  ///rendering
  return (
    <div className={style.parent}>
      {(message.msg || message.err) && (
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
        <h2 className="font-bold">Account Information:</h2>
        {/* profile image */}
        <div>
          {src ? (
            <div>
              <img
                src={src}
                alt={store.user.name}
                className="w-24 h-24 sm:w-36 sm:h-36 rounded-full mb-2 cursor-pointer"
                onClick={() => imageDialog.current.showModal()}
              />
              <dialog ref={imageDialog} className="p-4 rounded-md ">
                <div className="flex flex-col gap-4">
                  <button
                    className="px-4 py-2 rounded-md bg-red-500 text-white text-xs w-full "
                    onClick={() => imageDialog.current.close()}
                  >
                    close
                  </button>
                  <img
                    src={src}
                    className="w-full sm:w-96 border-gray-200 rounded-md border "
                  />
                  <button
                    className="bg-blue-200 px-4 py-2 w-full rounded-md"
                    onClick={() => {
                      fetch(src)
                        .then((response) => response.blob())
                        .then((blob) => {
                          const url = window.URL.createObjectURL(
                            new Blob([blob])
                          );
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${store.user.name}-profileImage.jpg`;
                          document.body.appendChild(a);
                          a.click();
                          window.URL.revokeObjectURL(url);
                          document.body.removeChild(a);
                        })
                        .finally(() => {
                          imageDialog.current.close();
                        });
                    }}
                  >
                    download
                  </button>
                </div>
              </dialog>
            </div>
          ) : (
            <ImagePlaceHolder width={36} height={36} color={"black"} />
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
            className="bg-gray-700 text-white px-2 py-1 rounded-md text-xs hover:bg-gray-500 transition
             duration-300 w-full flex items-center justify-center"
            onClick={openImageInput}
          >
            {updating ? (
              <div className="w-6 h-6 rounded-full border-t-2 border-b-2 border-green-600 animate-spin place-self-center"></div>
            ) : (
              "change profile image"
            )}
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
          <div className="flex flex-row gap-2 items-center">
            <h2>email:</h2>{" "}
            {!store.user?.confirm_email && (
              <button
                className="text-xs text-white rounded-md px-2 py-1 bg-red-500"
                onClick={() => confirmEmailDialog.current.showModal()}
              >
                action required click to view
              </button>
            )}
            <dialog
              className="backdrop:bg-black backdrop:bg-opacity-50 rounded-md p-4 bg-red-100 sm:w-3/6 w-full h-fit"
              ref={confirmEmailDialog}
            >
              <div className="flex flex-col gap-4">
                <button
                  className="px-4 py-2 rounded-md bg-red-500 text-white"
                  onClick={() => confirmEmailDialog.current.close()}
                >
                  close
                </button>
                <p>
                  We have sent a confirmation email to your registered email
                  address. Please click on the provided link to confirm your
                  email. If the event that link has expired, navigate to the
                  security section on your profile page. From there, you can
                  confirm your email.
                </p>
              </div>
            </dialog>
          </div>
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
    </div>
  );
}

export default PersonalInfoProfile;
