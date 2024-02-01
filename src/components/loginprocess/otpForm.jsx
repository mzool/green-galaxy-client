import { useState, useEffect } from "react";
import LoadingSpinner from "../../assets/loading";
import { useSearchParams, useNavigate } from "react-router-dom";
import checkForOTPTokenHandler from "./functions/checkForOTPTokenHandler.js";
import getOTPFromUserHandler from "./functions/getOtpFromUser.js";

function OtpForm() {
  const [otp, setOtp] = useState("");
  const [fetching, setFtching] = useState(true);
  const [search, setSearch] = useSearchParams();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  /// check for token if it expired or not
  useEffect(() => {
    const token = search.get("token");
    checkForOTPTokenHandler(token)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          navigate("/login");
        } else {
          setFtching(false);
        }
      });
  }, [search, navigate]);
  /// function handl form submit
  function handlForm(e) {
    e.preventDefault();
    setFtching(true);
    getOTPFromUserHandler(otp, search.get("token"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/profile");
        } else {
          setMsg(data.message);
          setFtching(false);
        }
      });
  }
  /// rendering
  if (fetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  return (
    <div className="text-gray-700 w-full p-4 flex flex-col gap-6 bg-white h-fit min-h-screen flex items-center">
      <div>
        {/* header */}
        <h2 className="font-bold ">
          You are here because you enabled tow steps login process
        </h2>
        {/* notice */}
        <p className="text-xs text-red-500 ">token expire after 5 minuts</p>
      </div>
      {/* form */}
      <form
        className="flex flex-col gap-4 rounded-md border-gray-400 
      shadow-sm shadow-gray-300 items-center justify-center w-full sm:w-4/6 md:w-3/6 p-4 bg-gray-100"
        onSubmit={(e) => handlForm(e)}
      >
        {/* otp */}
        <label htmlFor="otp">
          enter the one time password that sent to your email:
        </label>
        <input
          type="text"
          name="otp"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 rounded-md outline-0 border hover:border-green-500 
          focus:border-green-500 transtion duration-300"
          maxLength={6}
          minLength={6}
          required
        />
        {/* submit */}
        <input
          type="submit"
          value={"verify"}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-800
         transion duration-300"
        />
      </form>
      {/* message */}
      {msg && (
        <div className="w-full bg-red-100 rounded-md p-2  text-center font-semibold">
          {msg}
        </div>
      )}
    </div>
  );
}

export default OtpForm;
