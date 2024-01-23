import { useState } from "react";
import checkOTP from "../../../../functions/checkForOTP.js";
import Wrong from "../../../../assets/wrong.jsx";

function OTPForm({admin, form, setRule}) {
  /// form value
  const [otp, setOtp] = useState("");
  /// is fetching
  const [isFetching, setIsFetching] = useState(false);
  /// wrong render
  const [isWrong, setWrong] = useState(false);
  /// handle form submitting
  function handleFormSumbitting(e) {
    e.preventDefault();
    setIsFetching(true);
    checkOTP(otp)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          admin(true);
          form(false);
          setRule(data.rule);
          setWrong(false);
        } else {
          setWrong(true);
        }
      })
      .finally(() => setIsFetching(false));
  }

  //// rendering
  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleFormSumbitting}
        className="w-full h-fit px-4 py-10 rounded-lg border-2 border-gray-500 bg-gray-100 text-gray-600 flex items-center justify-center"
      >
        <div className=" w-full px-4 py-6 flex flex-col gap-4  font-bold">
          <label htmlFor="otp">
            Please insert the one time password that sent to your email:
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            className="rounded-lg outline-0 p-4 border-2 border-gray-500 bg-white text-center"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
          <input
            type="submit"
            value={isFetching ? "checking for your passwrod..." : "send"}
            className="p-4 rounded-lg bg-teal-600 text-white hover:bg-teal-800"
          />
          {isWrong && (
            <div className="flex flex-row gap-4">
              <Wrong color={"red"} />
              <p>wrong password</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default OTPForm;
