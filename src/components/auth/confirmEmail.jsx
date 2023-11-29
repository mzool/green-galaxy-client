import colors from "../../templates/colors.json";
import { useState } from "react";
function ConfirmEmail() {
  let [msg, setMsg] = useState({
    error: "",
    msg: "",
  });
  /// resend confirmation email
  function reSend() {
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_resend_confirmation_email
      }`,
      {
        method: "get",
        mode: "cors",
        credentials: "include",
      }
    ).then((res) => {
      if (res.status === 429) {
        setMsg({
          msg: "",
          error:
            "Confirmation Email had already sent to you, you can try again after one day.",
        });
        return Promise.resolve();
      } else if (res.status >= 200 && res.status <= 300) {
        setMsg({ error: "", msg: "Confirmation Email sent successfully" });
      }
    });
  }

  return (
    <div
      className={`bg-${colors.mainBackgroundColor} min-h-screen flex justify-center gap-4`}
    >
      <div className="bg-white p-4 h-fit rounded shadow-green-500 shadow-xl m-10 w-full sm:w-4/6 md:w-3/6 border-2 border-zinc-200 flex flex-row flex-wrap">
        <h1 className="text-2xl font-semibold mb-4">Confirm Your Email</h1>
        <p className="text-black mb-4">
          Please click the confirmation link in the email we sent you to verify
          your email address.
        </p>
        <div className="flex justify-center w-full flex-row gap-4">
          <button
            className={`bg-${colors.buttonsColor} text-white px-4 py-2 rounded hover:bg-green-600 transition ease-in-out duration-300`}
            onClick={reSend}
          >
            Resend Confirmation Email
          </button>
          <div className="w-fit p-4">
            {msg.error && <p className="text-red-500">{msg.error}</p>}
            {msg.msg && <p className="text-green-500">{msg.msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
