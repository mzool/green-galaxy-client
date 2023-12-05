// make it drawer for mid and small devices
import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import theStore from "../../store/store";
import profileImg from "../../assets/profileImg.svg";
import search from "../../assets/search.svg";
import Drawer from "./drawer"
const Navbar = () => {
  /// get the globals
  let store = useContext(theStore);
  /// get if user login and store has user
  let [userName, setUserName] = useState(store.store.user.name);
  /// get userName info
  useEffect(() => {
    setUserName(store.store.user.name);
  }, [store.store.user]);
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
  /// style
  let [linkClass, setLinkClass] = useState({
    style:
      "text-white hover:text-emerald-300 text-sm transition duration-300 ease-in-out aria-[current=page]:underline",
  });
  /// make the navbar responsive
  let [screenWidth, setScreenWidth] = useState(window.innerWidth);

 useEffect(() => {
   const handleResize = () => {
     setScreenWidth(window.innerWidth);
   };

   window.addEventListener("resize", handleResize);
   // Clean up the event listener when the component unmounts
   return () => {
     window.removeEventListener("resize", handleResize);
   };
 }, []);

  if (screenWidth < 1050){
    return <Drawer/>
  }
  return (
    <nav className="bg-green-600 p-4 ">
      <div className="container mx-auto flex flex-row gap-1 items-center min-h-10 h-fit">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold mb-4 sm:mb-0 w-1/6 m-0">
          <Link to="/" className="text-white text-2xl">
            Green Galaxy
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="w-2/6">
          <ul className="flex flex-row gap-5 w-full">
            <li>
              <NavLink to="/" className={linkClass.style}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-products" className={linkClass.style}>
                Shop All
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={linkClass.style}>
                blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className={linkClass.style}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className={linkClass.style}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        {/* search */}
        <div className="flex items-center cursor-pointer bg-green-400 rounded-lg w-1/6">
          <input
            id="search"
            type="text"
            className="border border-2 border-white p-1 rounded-lg focus:border focus:border-2 outline-none flex-1 w-5/6"
          />
          <label htmlFor="search" className="ml-1 w-1/6">
            <img
              src={search}
              alt="green-galaxy-search-bar"
              className="w-6 cursor-pointer"
            />
          </label>
        </div>
        {/* track order */}
        <div className="w-1/6">
          <NavLink
            to="/track-order"
            className="flex flex-row  m-0 p-0 justify-center items-center aria-[current=page]:underline text-white"
          >
            <p className={linkClass.style}>track order</p>
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
        {/* cart */}
        <div className="w-fit p-2 flex justify-center items-center mr-2">
          <Link to={"/cart"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-8 hover:rotate-12 transition duration-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </Link>
        </div>
        {/* Auth NavLinks */}
        <div className=" sm:mt-0 space-x-4 flex flex-row gap-1 justify-center items-center">
          {userName ? (
            <NavLink
              to="/profile"
              className="text-white hover:text-emerald-300 "
            >
              <div className="flex flex-col justify-center items-center m-0 h-10">
                <img
                  src={profileImg}
                  alt="green-galaxy-profile-img"
                  className="w-10 m-0"
                />
                {userName}
              </div>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="text-green-600 hover:text-white bg-emerald-200 hover:bg-emerald-900 border border-1 border-white rounded-lg p-2 transition duration-500 ease-in-out text-center"
            >
              Login
            </NavLink>
          )}
          {loggingOut ? (
            "loggingout..."
          ) : userName ? (
            <button
              onClick={logout}
              className="bg-red-600 text-white rounded-lg h-fit w-fit p-2 hover:bg-white hover:text-red-600 transition ease-in-out duration-300"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/register"
              className="bg-emerald-900 text-white hover:bg-emerald-200 hover:text-green-600 px-4 py-2 rounded-full transition duration-500 ease-in-out text-center"
            >
              register
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
