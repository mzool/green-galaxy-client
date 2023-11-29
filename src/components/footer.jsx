import { Link } from "react-router-dom";
import colors from "../templates/colors.json";
import { useState } from "react";
import { subscribeSchema } from "../validation/schemas";
import * as Yup from "yup";
const Footer = () => {
  /// handle subscribes
  let [email, setEmail] = useState("");
  let [msg, setMsg] = useState({
    error: "",
    success: "",
  });

  /// new subscriber function
  function newSubscriber(e) {
    e.preventDefault();
    /// validation
    subscribeSchema.validateSync({ email });
   
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_newSubscribe
      }`,
      {
        method: "post",
        mode: "cors",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          data.message === "Validation error"
            ? setMsg({
                ...msg,
                error: "please enter a valid email",
                success: "",
              })
            : setMsg({ ...msg, error: "", success: data.message });
        } else {
          setMsg({ ...msg, error: data.error, success: "" });
        }
        console.clear();
        setTimeout(() => {
          setEmail("");
          setMsg({
            error: "",
            success: "",
          });
        }, 3000);
      });
  }

  return (
    <footer
      className={`bg-${colors.navbarColor} text-${colors.navbarLinksColor}`}
    >
      <div className="container mx-auto p-6 ">
        <div className="flex flex-col wrap sm:row sm:flex-row  ">
          <div className="mb-6 sm:w-2/6 w-5/6 justify-center">
            <h2 className="text-lg font-semibold mb-3 ">Customer Service</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping</Link>
              </li>
              <li>
                <Link to="/returns">Returns</Link>
              </li>
            </ul>
          </div>

          <div className="mb-6 w-2/6">
            <h2 className="text-lg font-semibold mb-3">Connect</h2>
            <ul className="space-y-2">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Pinterest</a>
              </li>
            </ul>
          </div>
          <div className="mb-6 w-full sm:w-3/6">
            <h2 className="text-lg font-semibold mb-3">Subscribe</h2>
            <p>
              Subscribe to our newsletter for updates on promotions and new
              arrivals.
            </p>
            <form className="mt-3 w-full" onSubmit={newSubscriber}>
              <input
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md bg-white text-gray-900"
                value={email}
                onChange={(e) => {
                  setMsg({ error: "", success: "" });
                  setEmail(e.target.value);
                }}
                required
              />
              <button
                type="submit"
                className={`mt-2 w-full bg-teal-800 hover:bg-${colors.buttonHoverColor} text-whtie py-2 rounded-md transition duration-300`}
              >
                Subscribe
              </button>
              {msg?.error ? (
                <p className="text-red-500 bg-white w-fit h-fit rounded-lg  p-1 m-1">
                  {msg.error}
                </p>
              ) : null}
              {msg.success ? (
                <p className="text-green-500 bg-white w-fit h-fit rounded p-1 m-1">
                  {msg.success}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 bg-green-600">
        <p>
          &copy; {new Date().getFullYear()} Green Galaxy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
