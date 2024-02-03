import { useState, useRef, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import theStore from "../../store/store";
import profileImg from "../../assets/profileImg.svg";
function Drawer() {
  /// navigate
  const navigate = useNavigate();
  /// get the globals
  let { store } = useContext(theStore);
  /// search
  let [search, setSearch] = useState("");
  /// logout function
  let [loggingOut, setLoggingOut] = useState(false);
  function logout() {
    setLoggingOut(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_logout
      }`,
      {
        method: "get",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then(() => {
        setLoggingOut(false);
        window.location.href = "/";
      });
  }
  /// handle wheel
  const [visible, setVisible] = useState(false);
  function handleWheel(e) {
    if (e.deltaY < 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }
  ////event listener
  useEffect(() => {
    document.addEventListener("wheel", (e) => handleWheel(e));
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("wheel", (e) => handleWheel(e));
    };
  }, []);
  /// list down function
  let [open, setOpen] = useState(false);
  /// reference
  let theList = useRef(null);
  ///
  function controlList() {
    setOpen(!open);
    theList.current.classList.toggle("hidden");
  }
  /// style
  const linkClass = {
    style:
      "flex flex-row gap-1 justify-center items-center text-white hover:text-emerald-500 rounded p-1 transition duration-300 ease-in-out aria-[current=page]:m-3 aria-[current=page]:bg-black aria-[current=page]:bg-opacity-50 aria-[current=page]:text-white",
  };
//// rendering
  return (
    <div
      className={`flex flex-row bg-green-600 min-h-10 h-fit w-full p-4 items-center z-10  ${
        visible ? "top-0" : "top-full" 
      }`}
    >
      <div className="w-4/6 flex justify-center items-center font-semibold  sm:mb-0 text-center p-1">
        <h1 className="text-white w-full text-2xl hover:text-teal-300 transition ease-in-out duration-300 ">
          Green Galaxy
        </h1>
      </div>
      <div className="w-2/6 h-fit flex justify-center items-center flex-col gap-2">
        <button
          className=" flex justify-items-center w-10 active:opacity-50"
          onClick={controlList}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          )}
        </button>
        <div
          ref={theList}
          className="hidden absolute flex flex-col inset-0 top-20 bg-green-600  w-full h-fit text-green-900 justify-center items-center p-4 z-10 shadow-lg shadow-green-500 border border-2 border-white rounded-md"
        >
          <div className="close w-full flex justify-start items-center">
            <button
              className="w-10 border border-1 border-white bg-red-500 rounded-md flex justify-center"
              onClick={controlList}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* home */}
          <div className="w-full flex justify-center items-center">
            <NavLink to="/" className={linkClass.style} onClick={controlList}>
              Home
            </NavLink>
          </div>
          {/* shop all */}
          <div className="w-full flex justify-center items-center">
            <NavLink
              to="/all-products"
              className={linkClass.style}
              onClick={controlList}
            >
              Shop All
            </NavLink>
          </div>
          {/* blog */}
          <div className="w-full flex justify-center items-center">
            <NavLink
              to="/blog"
              className={linkClass.style}
              onClick={controlList}
            >
              blog
            </NavLink>
          </div>
          {/* about us */}
          <div className="w-full flex justify-center items-center">
            <NavLink
              to="/about-us"
              className={linkClass.style}
              onClick={controlList}
            >
              About Us
            </NavLink>
          </div>
          {/* track order */}
          <div className="w-full flex justify-center items-center">
            <NavLink
              to="/track-order"
              className={linkClass.style}
              onClick={controlList}
            >
              <p>track order</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8 hover:fill-gray-300 transition duration-300 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </NavLink>
          </div>
          {/* search */}
          <div className="w-full flex justify-center items-center">
            <div className="w-5/6">
              <input
                id="search"
                type="text"
                className="p-1 rounded-lg outline-none flex-1 w-full mb-2 "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mt-1">
              <label
                htmlFor="search"
                className="w-1/6"
                onClick={() => {
                  controlList();
                  navigate(`/search?searchFor=${search}`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </label>
            </div>
          </div>
          {/* cart */}
          <div className="w-full flex justify-center items-center">
            {store.cart.items?.length > 0 && (
              <p className="h-2 w-2 p-2 rounded-full bg-white flex items-center justify-center absolute">
                {store.cart.items.length}
              </p>
            )}
            <NavLink
              to="/cart"
              className={linkClass.style}
              onClick={controlList}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-12 h-10 hover:rotate-12 transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </NavLink>
          </div>
          {/* auth links */}
          <div className="w-full flex flex-col gap-5 m-2 justify-center items-center">
            {store.user.name ? (
              <NavLink
                to="/profile"
                className="text-white hover:text-emerald-300 "
                onClick={controlList}
              >
                <div className="flex flex-col justify-center items-center m-0 h-10">
                  <img
                    src={profileImg}
                    alt="green-galaxy-profile-img"
                    className="w-10 m-0"
                  />
                  {store.user.name}
                </div>
              </NavLink>
            ) : (
              <NavLink
                onClick={controlList}
                to="/login"
                className="text-white hover:text-white hover:bg-emerald-900 border -border-1 border-white rounded-lg p-2 transition duration-500 ease-in-out text-center"
              >
                Login
              </NavLink>
            )}
            {loggingOut ? (
              "loggingout..."
            ) : store.user.name ? (
              <button
                disabled={loggingOut}
                onClick={logout}
                className="bg-red-600 text-white rounded-lg h-fit w-fit p-1 hover:bg-white hover:text-red-600"
              >
                Log out
              </button>
            ) : (
              <NavLink
                to="/register"
                className="bg-emerald-900 text-white hover:bg-emerald-200 hover:text-emerald-900 px-4 py-2 rounded-full transition duration-500 ease-in-out text-center"
              >
                register
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
