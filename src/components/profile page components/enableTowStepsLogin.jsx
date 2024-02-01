import enableTowStepsLoginHandler from "./functions/enableTowStepsLogin.js";
import { useState } from "react";

function EnableTowStepsLogin({ store }) {
  const [enable, setEnable] = useState(store?.user?.towStepsLogin);
  /// handle the form
  const [msg, setMsg] = useState("");
  const [fetching, setFetching] = useState(false);
  function handleForm(e) {
    e.preventDefault();
    setFetching(true);
    enableTowStepsLoginHandler()
      .then((res) => {
        if (res.status == 429) {
          return setMsg(
            "You can update tow steps login process one time every 24 hours"
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.success) {
          setEnable(data.towStepsLogin);
        }
        setMsg(data.message);
      })
      .finally(() => {
        setFetching(false);
      });
  }
  //// rendering
  return (
    <div className="w-full flex flex-col gap-6 h-fit bg-gray-200 text-gray-700 p-4 rounded-md">
      <h2 className="text-center font-bold">Enable tow steps login</h2>
      <p className="text-sm">
        when you try to login again to your profile, an email with one time
        password will sent to you
      </p>
      <form
        className="flex flex-col gap-4 w-full "
        onSubmit={(e) => handleForm(e)}
      >
        <div className="flex flex-row gap-4 py-2 group w-fit cursor-pointer">
          <label htmlFor="enable" className=" cursor-pointer">
            {enable ? "disable tow steps login:" : " enable tow steps login:"}
          </label>
          <input
            id="enable"
            type="checkbox"
            checked={enable}
            className="hidden"
            onChange={(e) => setEnable(e.target.checked)}
          />
          <span
            className={`relative top-0 h-6 w-6 rounded-md cursor-pointer ${
              enable ? "bg-green-500" : "bg-white"
            } ring-2 
           ring-green-600 group-hover:bg-green-600 transtion duration-300`}
            onClick={() => setEnable((pr) => !pr)}
          >
            {enable && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            )}
          </span>
        </div>

        {/* submit */}
        {fetching ? (
          <div className="w-10 h-10 rounded-full border-b-2 border-t-2 animate-spin border-green-600"></div>
        ) : (
          <input
            type="submit"
            value={"apply change"}
            className="px-4 py-2 rounded-md bg-green-300 text-gray-700 hover:bg-green-100 transtion duration-300 w-fit"
          />
        )}
      </form>
      {msg && (
        <div className="w-full bg-blue-200 font-semibold p-2 rounded text-gray-700">
          {msg}
        </div>
      )}
    </div>
  );
}

export default EnableTowStepsLogin;
