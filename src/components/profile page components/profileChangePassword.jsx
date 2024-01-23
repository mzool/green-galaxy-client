import { useState } from "react";
import changePasswordHandler from "./functions/changePasswordHandler.js";

function ProfileChangePassword() {
  const [msg, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  //// handle change password
  function handleChangePassword(e) {
    e.preventDefault();
    setFetching(true);
    /// check if password and confirm password are same
    if (newPassword !== confirmNewPassword) {
      setFetching(false);
      return setMessage("password and confirm password are not match");
    }
    changePasswordHandler(oldPassword, newPassword, confirmNewPassword)
      .then((res) => {
        if (res.status == 400) {
          return setMessage(
            "passwrod should contains at least: 1 capital letter, 1 small letter, 1 number, 1 special character with length of 8"
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setMessage(data.message);
        if (data.success) {
          setOldPassword("");
          setConfirmNewPassword("");
          setNewPassword("");
        }
      })
      .finally(() => {
        setFetching(false);
        setTimeout(() => {
          setMessage("");
        }, 10000);
      });
  }
  /// rendering
  return (
    <div>
      <div className="bg-gray-100 text-gray-700 h-fit w-full p-2 flex flex-col gap-2 rounded-md">
        <h2>Change Password:</h2>
        <form
          className=" flex flex-col gap-2 "
          onSubmit={(e) => handleChangePassword(e)}
        >
          <input
            type="password"
            placeholder="new password"
            className="px-4 py-2 rounded-md outline-0 w-full border border-gray-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="confirm password"
            className="px-4 py-2 rounded-md outline-0 w-full border border-gray-500"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="current password"
            className="px-4 py-2 rounded-md outline-0 w-full border border-gray-500"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          {fetching ? (
            <div className="border-b-2 border-t-2 border-green-500 rounded-full h-6 w-6 animate-spin" />
          ) : (
            <input
              disabled={fetching}
              type="submit"
              value={"change password"}
              className="px-4 py-2 rounded-md outline-0 w-fit bg-gray-700 text-white hover:bg-gray-500 transtion duration-300 border border-gray-500"
            />
          )}
        </form>
        {msg && (
          <div className="w-full px-4 py-2 rounded-md bg-white text-gray-700 font-semibold">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileChangePassword;
