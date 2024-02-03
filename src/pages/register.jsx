import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../validation/schemas";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../assets/loading";
import theStore from "../store/store.js";
import getUser from "../functions/getUserInfo.js";
import register from "../functions/registerFetch.js";
const RegisterPage = () => {
  /// store
  let { store } = useContext(theStore);
  /// navigate
  let navigate = useNavigate();
  /// get user info
  let [isFetch, setFetch] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!store.user._id) {
      getUser()
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            navigate("/profile");
          } else {
            setFetch(false);
          }
        });
    }
  }, []);

  /// error handling and massages
  let [errMsg, setErrMsg] = useState("");
  /// handle registration
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    register(values)
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Validation error") {
          setErrMsg(data.errors[0]);
        } else if (data.error) {
          setErrMsg(data.error);
        } else {
          navigate("/profile");
        }
      }).finally(()=>{
        setSubmitting(false)
      })
  };
  //// style
  const style = {
    field:
      "w-full p-2 text-gray-700 outline-0 border border-gray-200 focus:border-2 focus:border-green-500 rounded-md transition ease-in-out duration-300",
  };
  /// loader
  if (isFetch) {
    return <LoadingSpinner color={"green-500"} />;
  }
  return (
    <div className="w-full p-4 h-fit bg-white flex items-center justify-center text-gray-700">
      <div className="bg-white p-8 rounded-md w-full sm:w-4/6 lg:w-3/6 border-1 border-gray-200 shadow-gray-500 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-green-600">
          Start your journey with Green Galaxy
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
            <Form className="w-full">
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
                  className="bg-green-600 text-white px-6 py-2 m-4 rounded hover:bg-green-700 transition ease-in-out duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting && !errMsg ? "registering..." : "register"}
                </button>
              </div>
              <div className="mt-2 text-red-500">
                <p className="mt-2">{errMsg}</p>
              </div>
              <div className="mt-2 flex flex-col bg-white">
                <p>Have an account? </p>
                <Link to={"/login"} className="text-green-600 hover:text-green-800 transtion duration-300">
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
