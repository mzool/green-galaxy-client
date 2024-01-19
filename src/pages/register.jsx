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
      "w-full p-2 outline-0 border border-zinc-200 shadow-green-200 shadow-sm focus:border-2 focus:border-green-500 hover:shadow-lg hover:shadow-green-500 rounded-md transition ease-in-out duration-300",
  };
  /// loader
  if (isFetch) {
    return <LoadingSpinner color={"green-500"} />;
  }
  return (
    <div className="min-h-screen sm:grid sm:grid-cols-3 p-6 flex flex-col gap-4 items-start justify-center bg-white">
      {/* register with section */}
      <div className="col-span-1 w-full bg-gray-100 h-full flex flex-col gap-6 p-6 items-center rounded-lg text-green-600"></div>
      {/* green galaxy form */}
      <div className="col-span-2 bg-white p-8 rounded w-full bg-black border-2 border-zinc-200 shadow-gray-500 shadow-lg">
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
                  {isSubmitting && !errMsg ? "registering..." : (
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
