import { useFormik } from "formik";
import checkoutSchema from "../../validation/checkout_schema.js";
import placeOrder from "./placeOrder.js";
import ThankYou from "./thankyou.jsx";
import { useState } from "react";

function CheckoutForm({ cart }) {
  const [thanks, setThanks] = useState({ orderNumber: "" });
  const [fetching, setFetching] = useState(false);
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
      setFetching(true);
      let theItems = cart.items.map((item) => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          otherVarients: item.otherVarients,
        };
      });
      let data = {
        ...values,
        items: theItems,
        payment_method: "cash",
        cartId: cart.cartId,
      };
      console.log(data);
      placeOrder(data)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setThanks({ orderNumber: data.orderNumber });
          }
        })
        .finally(() => {
          setFetching(false);
        });
    },
  });
  /// style
  const style = {
    parentDiv:
      "h-fit w-full flex flex-col gap-4 items-center justify-start sm:px-10 p-4",
    form: "flex flex-col gap-2 w-full h-fit p-2 justify-center",
    input:
      "w-full p-1 bg-white border-gray-300 border-2 hover:border-gray-500 focus:border-gray-500 rounded-md text-gray-700 transition ease-in-out duration-300 outline-0",
    input_err:
      "w-full p-1 bg-red-50 border-red-500 border-2 hover:border-red-400 focus:border-red-400 rounded-md text-gray-700 transition ease-in-out duration-300 outline-0",
  };
  //////////// rendering
  if (thanks.orderNumber) {
    return <ThankYou orderNumber={thanks.orderNumber} />;
  }
  return (
    <div className={style.parentDiv}>
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
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-xs">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
        </div>
        <hr className="m-2" />
        <input
          type="submit"
          value={fetching ? "placing new order..." : "place order"}
          disabled={fetching}
          className="border border-gray-100 bg-gray-700 rounded-md text-white px-4 py-2 hover:bg-gray-600 transition duration-300"
        />
      </form>
    </div>
  );
}

export default CheckoutForm;
