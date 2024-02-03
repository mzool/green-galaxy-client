import { useFormik } from "formik";
import { loginSchema } from "../validation/schemas";
import { useContext, useEffect, useState, useRef } from "react";
import theStore from "../store/store";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../assets/loading";
import getUser from "../functions/getUserInfo.js";
import login from "../functions/loginFetch.js";
import { Link } from "react-router-dom";
import forgetPasswordHandler from "../functions/forgetPassword.js";

const LoginPage = () => {
  /// forget password
  const forgetPassDialog = useRef(null);
  const [forgetPasswordEmail, setForgetEmail] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [fetchingDialog, setFetchingDialog] = useState(false);
  /// navigate
  const navigate = useNavigate();
  /// get the global store
  let { store } = useContext(theStore);
  /// get user info
  //// is fetching for rendering controll
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    /// check store
    if (store.user._id) {
      navigate("/profile");
    } else {
      setIsFetching(true);
      /// get user information from the cookies
      getUser()
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            store.updateUser(data.data);
            navigate("/profile");
          }
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, []);

  /// handle form using formik
  let [errMsg, setErrMsg] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setIsFetching(true);
      // Handle form submission here
      login(values)
        .then((res) => {
          if (res.status == 400) {
            setErrMsg("invalid email or password");
          } else {
            res.json().then((data) => {
              if (data.success && !data.towStepsLogin) {
                navigate("/profile");
              } else if (data.success && data.towStepsLogin) {
                navigate(`/login/otp-form?token=${data.token}`);
              } else {
                setErrMsg(data.message);
              }
            });
          }
        })
        .finally(() => {
          setIsFetching(false);
        });
    },
  });
  ///// rendering
  if (!store.user._id && !isFetching) {
    return (
      <div className="min-h-screen flex p-4 justify-center h-full w-full bg-white p-10">
        <div className="w-full sm:w-4/6 md:w-3/6 h-fit p-10 space-y-4 rounded-md border bg-white border-gray-300 shadow-md shadow-gray-400">
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4 flex flex-col justify-center">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`mt-1 p-2 w-full  ${
                    formik.touched.email && formik.errors.email
                      ? "border-b-2 border-red-500 outline-0"
                      : "border-b-2 border-green-500 outline-0"
                  } `}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`mt-1 p-2 w-full ${
                    formik.touched.password && formik.errors.password
                      ? "border-b-2 border-red-500 outline-0"
                      : "border-b-2 border-green-500 outline-0"
                  }`}
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="error w-full text-red-500 m-1 p-1">
                <p>{errMsg}</p>
              </div>
              <div className="w-full flex justify-center">
                <button
                  disabled={isFetching}
                  type="submit"
                  className="w-full py-2 px-4 text-white rounded-md bg-green-500 hover:bg-green-700 transition ease-in-out duration-300"
                >
                  login
                </button>
              </div>
            </div>
          </form>
          <div className="w-full flex flex-col gap-2">
            {/* forget password dialog */}
            <dialog
              ref={forgetPassDialog}
              className="w-fit h-fit p-4 rounded-md backdrop:bg-black backdrop:bg-opacity-50"
            >
              <form
                className="flex flex-col gap-4 text-gray-700 p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFetchingDialog(true);
                  forgetPasswordHandler(forgetPasswordEmail)
                    .then((res) => {
                      if (res.status == 429) {
                        return setDialogMsg(
                          "We had sent an email with new password to this email address, try again after 24 hours"
                        );
                      } else {
                        return res.json();
                      }
                    })
                    .then((data) => {
                      setDialogMsg(data.message);
                    })
                    .finally(() => {
                      setForgetEmail("");
                      setFetchingDialog(false);
                      setTimeout(() => {
                        setDialogMsg("");
                        forgetPassDialog.current.close();
                      }, 3000);
                    });
                }}
              >
                <p>
                  we will send a new password to your email address, use it to
                  access your account and change it
                </p>
                <p className="text-xs text-red-500">
                  ** this password is valid just for one time login process,
                  even if you logged in using current password{" "}
                </p>
                <label htmlFor="email">enter your email address:</label>
                <input
                  disabled={fetchingDialog}
                  type="email"
                  required
                  value={forgetPasswordEmail}
                  onChange={(e) => setForgetEmail(e.target.value)}
                  className="rounded-md px-4 py-2 outline-0 border focus:border-green-700"
                />
                <p>{dialogMsg}</p>
                <input
                  disabled={fetchingDialog}
                  type="submit"
                  value={"send email with new password"}
                  className="rounded-md px-4 py-2 bg-green-600 text-white hover:bg-green-800 transtion duration-300"
                />
              </form>
            </dialog>
            {/* forget password */}
            <button
              className="text-gray-700 w-fit hover:text-gray-500 transtion duration-300"
              onClick={() => {
                forgetPassDialog.current.showModal();
              }}
            >
              forget your password?
            </button>
            {/* go to register page */}
            <Link
              to={"/register"}
              className="text-green-700 hover:text-green-500 w-fit transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner color={"green-500"} />;
  }
};
export default LoginPage;
