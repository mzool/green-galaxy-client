import { useFormik } from "formik";
import { useState } from "react";
import checkoutSchema from "../../validation/checkout_schema.js";
import PaymentPage from "./checkoutPayment.jsx";
function CheckoutForm(props) {
  const { items, totalPrice } = props;
  /// progress bar
  let [progress, setProgress] = useState({
    info: true,
    payment: false,
  });
  /// get all values from form
  let [shippingInfo, setShippingInfo] = useState({});
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      city: "",
      address: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      setProgress({ ...progress, payment: true });
      setShippingInfo(values);
      window.scrollTo({
        top:500,
        behavior:"smooth"
      })
    },
  });
  /// style
  let [style, setStyle] = useState({
    parentDiv:
      "h-fit min-h-screen w-full flex flex-col gap-4 items-center justify-start p-4",
    form: "flex flex-col gap-2 w-full h-fit p-2 justify-center",
    input:
      "w-3/6 p-1 bg-white border-teal-400 border-2 hover:border-teal-600 focus:border-teal-600 rounded-md text-zinc-700 transition ease-in-out duration-300 outline-0",
    input_err:
      "w-3/6 p-1 bg-red-50 border-red-500 border-2 hover:border-teal-600 focus:border-teal-600 rounded-md text-zinc-700 transition ease-in-out duration-300 outline-0",
  });
  //////////// rendering
  return (
    <div className={style.parentDiv}>
      {/* progress bar */}
      <div className="bg-zinc-50 h-fit w-full p-4 flex flex-row gap-6 rounded-md items-center justify-center text-sm">
        {/* info */}
        <div className="flex flex-row gap-2 items-center">
          <h2 className={progress.payment==true?"text-gray-500":"text-green-600"}>shipping Information</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={progress.payment == true ? "gray" : "green"}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
        </div>
        {/* arrow */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        {/* payment */}
        <div className="flex flex-row gap-2 items-center">
          <h2 className={progress.payment==false?"text-gray-500":"text-green-600"}>payment</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={progress.payment == false ? "gray" : "green"}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            />
          </svg>
        </div>
      </div>
      {/* form */}
      <form className={style.form} onSubmit={formik.handleSubmit}>
        <div>
          <h2>Contact Information:</h2>
        </div>
        {/* email */}
        <div>
          <input
            className={
              formik.touched.email && formik.errors.email
                ? style.input_err
                : style.input
            }
            type="email"
            name="email"
            placeholder="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={progress.payment}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
          ) : null}
        </div>
        {/* phone */}
        <div>
          <input
            className={
              formik.touched.phone && formik.errors.phone
                ? style.input_err
                : style.input
            }
            type="phone"
            name="phone"
            placeholder="phone number 07xxxxxxxx"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={progress.payment}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-xs">{formik.errors.phone}</div>
          ) : null}
        </div>
        <hr className="m-2" />
        {/* shipping address */}
        <div>
          <h2>Shipping Information:</h2>
        </div>
        {/* first name */}
        <div>
          <input
            className={
              formik.touched.firstName && formik.errors.firstName
                ? style.input_err
                : style.input
            }
            type="text"
            name="firstName"
            id="firstName"
            placeholder="first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={progress.payment}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-xs">
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>
        {/* last name */}
        <div>
          <input
            className={
              formik.touched.lastName && formik.errors.lastName
                ? style.input_err
                : style.input
            }
            type="text"
            name="lastName"
            id="lastName"
            placeholder="last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={progress.payment}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-xs">{formik.errors.lastName}</div>
          ) : null}
        </div>
        {/* city */}
        <div>
          <input
            className={
              formik.touched.city && formik.errors.city
                ? style.input_err
                : style.input
            }
            type="text"
            name="city"
            id="city"
            placeholder="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={progress.payment}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-xs">{formik.errors.city}</div>
          ) : null}
        </div>
        <div>
          {/* address */}
          <div>
            <input
              className={
                formik.touched.address && formik.errors.address
                  ? style.input_err
                  : style.input
              }
              type="text"
              name="address"
              id="address"
              placeholder="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readOnly={progress.payment}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-xs">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
        </div>
        <hr className="m-2" />
        {/* confirm shipping address */}
        <div>
          {!progress.payment&&<button
            type="submit"
            className="p-2 bg-teal-500 rounded-md text-white"
          >
            continue to payment
          </button>}
        </div>
      </form>
      {progress.payment&&progress.info&&<PaymentPage items={items} totalPrice={totalPrice} shippingInfo={shippingInfo}/>}
    </div>
  );
}

export default CheckoutForm;
