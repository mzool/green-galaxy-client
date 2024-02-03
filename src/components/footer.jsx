import { Link } from "react-router-dom";
import colors from "../templates/colors.json";
import { useState, useRef } from "react";
import { subscribeSchema } from "../validation/schemas";

const Footer = () => {
  /// handle subscribes
  let [email, setEmail] = useState("");
  let [msg, setMsg] = useState("");
  ///
  const dialog = useRef(null);
  function handleDialog() {
    dialog.current.showModal();
  }
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status == 400) {
          setMsg("please enter a valid email");
        }
      })
      .then((data) => {
        setMsg(data.message);

        setTimeout(() => {
          setEmail("");
          setMsg("");
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
                <Link to="/refund-policy">refund policy</Link>
              </li>
            </ul>
          </div>

          <div className="mb-6 w-2/6">
            <h2 className="text-lg font-semibold mb-3">Connect</h2>
            <dialog ref={dialog} className="rounded-md p-4 outline-0">
              <div className="rounded-md p-4 text-gray-700 bg-white w-[500px] flex flex-col gap-4">
                <p>
                  Thank you for your interest! Currently, we're not on social
                  media, but stay tuned for updates. We're working on
                  establishing our presence, and we look forward to connecting
                  with you soon. In the meantime, feel free to reach out through
                  our website or other contact channels. Your support means the
                  world to us!
                </p>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded "
                  onClick={() => dialog.current.close()}
                >
                  close
                </button>
              </div>
            </dialog>
            <ul className="space-y-2">
              <li onClick={handleDialog}>
                <p className="cursor-pointer">Facebook</p>
              </li>
              <li onClick={handleDialog}>
                <p className="cursor-pointer">Instagram</p>
              </li>
              <li onClick={handleDialog}>
                <p className="cursor-pointer">Twitter</p>
              </li>
              <li onClick={handleDialog}>
                <p className="cursor-pointer">Pinterest</p>
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
              {msg && (
                <div className="bg-white w-fit rounded-md p-2 text-gray-700">
                  {msg}
                </div>
              )}
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
