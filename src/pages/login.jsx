import { useFormik } from "formik";
import { loginSchema } from "../validation/schemas";
import { useContext, useEffect, useState } from "react";
import theStore from "../store/store";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../assets/loading";
const LoginPage = () => {
  const navigate = useNavigate();
  /// get the global store
  let store = useContext(theStore);
  /// do not return login component if the user is already logged in
  let [LogIn, setLogIn] = useState(false);
  /// get user info
  let [endFetch, setEndFetch] = useState(false);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_user_info
      }`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          navigate("/profile");
        } else {
          setLogIn(true);
          console.clear();
        }

        setEndFetch(true);
      });
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
      // Handle form submission here
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_login
        }`,
        {
          method: "post",
          cors: "cors",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrMsg(data.error);
          } else {
            navigate("/profile");
          }
        });
    },
  });
  ///// rendering
  if (LogIn && endFetch) {
    return (
      <div className="min-h-screen flex p-4 justify-center h-full w-full bg-white">
        <div className="w-full sm:w-4/6 md:w-3/6 h-fit p-10 space-y-4 bg-white rounded-lg shadow-lg border-2 border-zinc-200 shadow-green-500 shadow-lg mt-10">
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
                  }`}
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
                  type="submit"
                  className="w-3/6 py-2 px-4 text-white rounded-md bg-green-500 hover:bg-green-700 transition ease-in-out duration-300"
                >
                  login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner color={"green-500"} />;
  }
};

export default LoginPage;
