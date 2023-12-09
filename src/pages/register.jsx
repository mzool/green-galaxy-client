import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../validation/schemas";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import dots from "../assets/dots.svg";
import LoadingSpinner from "../assets/loading";
import colors from "../templates/colors.json";
//import theStore from "../store/store.js";
const RegisterPage = () => {
  /// store
 // let {store} = useContext(theStore);
  /// navigate
  let navigate = useNavigate();
  /// get user info
  let [isFetch, setFetch] = useState(true);
  useEffect(() => {
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
        if (data._id) {
          navigate("/profile");
        } else {
          setFetch(false);
        }
      });
  }, []);

  /// error handling and massages
  let [errMsg, setErrMsg] = useState("");
  /// handle registration
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_register
      }`,
      {
        method: "post",
        cors: "cors",
        headers: {
          Authorization: `GreenBearer ${
            import.meta.env.VITE_authorization_token
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Validation error") {
          setErrMsg(data.errors[0]);
        } else if (data.error) {
          setErrMsg(data.error);
        } else {
          navigate("/profile");
        }
      });
  };
  //// style
  const style = {
    field:
      "w-full p-2 outline-0 border border-zinc-200 shadow-green-200 shadow-sm focus:border-2 focus:border-green-500 hover:shadow-lg hover:shadow-green-500 rounded-md transition ease-in-out duration-300",
  };
  /// loader
  if (isFetch) {
    return <LoadingSpinner color={"green-500"} />;
  }
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-${colors.mainBackgroundColor}`}
    >
      <div className="bg-white p-8 rounded shadow-lg w-5/6 sm:w-4/6 md:w-3/6 mt-6 border-2 border-zinc-200 shadow-green-500 shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">
          Green Galaxy Registration
        </h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username">Username</label>
                <Field type="text" name="username" className={style.field} />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className={style.field} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone">Phone Number</label>
                <Field type="text" name="phone" className={style.field} />
                <ErrorMessage
                  name="phone"
                  component="div"
                  outline-0
                  border-2
                  border-green-500
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className={style.field}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={style.field}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className={`bg-${colors.buttonsColor} text-white px-4 py-2 rounded hover:bg-green-700 transition ease-in-out duration-300 `}
                  // disabled={isSubmitting}
                >
                  {isSubmitting && !errMsg ? (
                    <img src={dots} width={"30px"} alt="grenn-galaxy-dots" />
                  ) : (
                    "register"
                  )}
                </button>
              </div>
              <div className="mt-2 text-red-500">
                <p className="mt-2">{errMsg}</p>
              </div>
              <div className="mt-2 flex flex-cols gap-2 bg-white">
                <p>Have an account? </p>
                <Link to={"/login"} className="text-green-500">
                  Go to Login page
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
