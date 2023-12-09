import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../assets/loading";
import Admin from "./admin";
import Wrong from "../../assets/wrong";
function AuthAdmin() {
  /// use navigate
  let navigate = useNavigate();
  let [otp, setOtp] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });
  /// if admin logged in
  let [session, setSession] = useState(false);
  /// if the user session is valid
  let [user, setUser] = useState(false);
  /// admin
  let [admin, setAdmin] = useState(false);
  ///  rendering controllers
  let [startFetch, setFetch] = useState(false);
  let [wrong, setWrong] = useState(false);
  let [msg, setMsg] = useState("");
  let firstOtbvalue = useRef();
  /// check if the admin has authenticated
  useEffect(() => {
    setFetch(true);
    /// get user info
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
          navigate("/login", {state:{wanted:"/auth-admin"}});
        } else {
          /// if user is confirmed email
          if (data.confirm_email === true) {
            setUser(true);
          } else {
            navigate("/profile", {state:{wanted:"/auth-admin"}});
          }
          /// if admin is authenticated before
          fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
              import.meta.env.VITE_checkAdmin
            }`,
            {
              method: "get",
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
              if (data.success === true) {
                setFetch(false);
                setSession(true);
                setAdmin(true);
              } else {
                setFetch(true);
                /// auth admin
                fetch(
                  `${import.meta.env.VITE_domain}${
                    import.meta.env.VITE_mainapi
                  }${import.meta.env.VITE_authenticate_admin}`,
                  {
                    method: "get",
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
                    if (data.success && data.permessions) {
                      setFetch(false);
                      setAdmin(true);
                    } else {
                      setOtp({});
                    }
                  });
              }
            });
        }
      });
  }, [navigate]);
  ///// submit the otp
  useEffect(() => {
    if (
      otp.first &&
      otp.second &&
      otp.third &&
      otp.fourth &&
      otp.fifth &&
      otp.sixth
    ) {
      setWrong(false);
      setMsg("");
      setFetch(true);
      let _OTP = "";
      Object.keys(otp).map((key) => {
        _OTP = _OTP + otp[key];
      });
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_admin_otp
        }`,
        {
          method: "post",
          mode: "cors",
          credentials: "include",
          headers: {
            Authorization: `GreenBearer ${
              import.meta.env.VITE_authorization_token
            }`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ otp: _OTP.trim() }),
        }
      ).then((res) => {
        if (res.status === 429) {
          setMsg("Try again after 5 minutes");
          setFetch(false);
          setWrong(true);
        } else if (res.status >= 200 && res.status < 300) {
          setAdmin(true);
          window.location.reload("self");
        } else {
          setWrong(true);
          setAdmin(false);
          setOtp({
            first: "",
            second: "",
            third: "",
            fourth: "",
            fifth: "",
            sixth: "",
          });
          setFetch(false);
          firstOtbvalue.current.focus();
        }
      });
    }
  }, [otp]);

  /// if user session is valid and user is admin
  if (session === true && user === true && admin === true) {
    return <Admin />;
  }
  if (user === true && session === false && startFetch == false) {
    return (
      <div className="w-full h-screen flex justify-center bg-white p-4 ">
        <div className="sm:w-3/6 w-full h-1/6 bg-green-100 h-fit shadow-xl shadow-green-500 rounded-lg p-2 grid grid-rows-2 gap-2 border-zinc-200 border-2">
          <div>
            <h1 className="text-green-600">
              Enter the OTP that was sent to your email:
            </h1>
            <p className="text-red-500 text-xs">
              ** Notice that you have 1 minute.
            </p>
          </div>
          <div>
            <form action="" className="grid grid-cols-7 gap-1 w-full">
              <div className=" w-full">
                <input
                  name="first"
                  type="number"
                  ref={firstOtbvalue}
                  className="w-full rounded-lg outline-0 p-2"
                  value={otp.first}
                  onChange={(e) => setOtp({ ...otp, first: e.target.value })}
                  maxLength={1}
                />
              </div>
              <div className="  w-full">
                <input
                  name="second"
                  type="number"
                  className="w-full rounded-lg outline-0 p-2"
                  value={otp.second}
                  onChange={(e) => setOtp({ ...otp, second: e.target.value })}
                  maxLength={1}
                />
              </div>
              <div className="  w-full">
                <input
                  name="third"
                  type="number"
                  className="w-full rounded-lg outline-0 p-2"
                  value={otp.third}
                  onChange={(e) => setOtp({ ...otp, third: e.target.value })}
                  maxLength={1}
                />
              </div>
              <div className="  w-full">
                <input
                  name="fourth"
                  type="number"
                  className="w-full rounded-lg outline-0 p-2"
                  value={otp.fourth}
                  onChange={(e) => setOtp({ ...otp, fourth: e.target.value })}
                  maxLength={1}
                />
              </div>
              <div className="  w-full">
                <input
                  name="fifth"
                  type="number"
                  className="w-full rounded-lg outline-0 p-2"
                  value={otp.fifth}
                  onChange={(e) => setOtp({ ...otp, fifth: e.target.value })}
                  maxLength={1}
                />
              </div>
              <div className="  w-full">
                <input
                  name="sixth"
                  type="number"
                  className="w-full rounded-lg outline-0 p-2"
                  value={otp.sixth}
                  onChange={(e) => setOtp({ ...otp, sixth: e.target.value })}
                  maxLength={1}
                />
              </div>
              {startFetch && (
                <div className="w-full  flex justify-center items-center">
                  <div className="w-8 h-8 animate-spin border-b-2 border-t-2 border-green-600 rounded-full"></div>
                </div>
              )}
              {wrong && (
                <div className="w-full  flex justify-center items-center">
                  <Wrong color={"red"} />
                </div>
              )}
            </form>
            <div className="w-full p-2 text-red-500">{msg}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <LoadingSpinner color={"green-500"} />
    </div>
  );
}

export default AuthAdmin;
