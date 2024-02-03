import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import theStore from "../../store/store";
import profileImg from "../../assets/profileImg.svg";
import Drawer from "./drawer";
const Navbar = () => {
  /// navigate
  const navigate = useNavigate();
  /// get the globals
  let { store } = useContext(theStore);
  /// reference
  const searchRef = useRef();
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
  /// style
  const linkClass = {
    style:
      "text-white hover:text-green-300 text-sm transition duration-300 ease-in-out aria-[current=page]:underline",
  };
  /// make the navbar responsive
  let [screenWidth, setScreenWidth] = useState(window.innerWidth);
  //// fetch cart api and add search event listener
  function handleSearchKeyPress(e) {
    if (e.ctrlKey && e.key == "/") {
      e.preventDefault();
      searchRef.current.focus();
    }
  }
  /// handle wheel
  const [visible, setVisible] = useState(true);
  function handleWheel(e) {
    if (e.deltaY < 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }
  //// get cart and add event listener
  useEffect(() => {
    document.addEventListener("wheel", (e) => handleWheel(e));
    document.addEventListener("keydown", handleSearchKeyPress);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keypress", handleSearchKeyPress);
      window.removeEventListener("wheel", (e) => handleWheel(e));
    };
  }, []);
  if (screenWidth < 1050) {
    return <Drawer />;
  }
  return (
    <nav
      className={`bg-green-600 p-2 z-10 ${
        visible ? "top-0" : "bottom-full"
      } `}
    >
      <div className="grid grid-cols-5 gap-1 items-center justify-center p-2">
        {/* Logo */}
        <Link to="/" className="text-white text-3xl font-semibold">
          Green Galaxy
        </Link>
        {/* Navigation Links */}
        <div className="w-full flex flex-row gap-4 flex-wrap">
          <NavLink to="/" className={linkClass.style}>
            Home
          </NavLink>
          <NavLink to="/all-products" className={linkClass.style}>
            Shop All
          </NavLink>
          <NavLink to="/blog" className={linkClass.style}>
            blog
          </NavLink>
          <NavLink to="/about-us" className={linkClass.style}>
            About Us
          </NavLink>
          <NavLink to="/contact-us" className={linkClass.style}>
            Contact Us
          </NavLink>
        </div>
        {/* search */}
        <div className="flex items-center cursor-pointer rounded-lg w-full">
          <form
            className="flex flex-row gap-0 p-2 rounded-lg w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (search.length == 0) {
                return;
              }
              const searchFor = search;
              setSearch("");
              navigate(`/search?searchFor=${searchFor}`);
            }}
          >
            <input
              ref={searchRef}
              id="search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="ctrl and / to search"
              className="border border-2 border-white p-2 rounded-lg focus:border focus:border-2 outline-none flex-1 w-5/6"
            />
            <button
              type="submit"
              className="flex items-center justify-center p-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
        </div>
        {/* track order and cart here */}
        <div className="w-full flex flex-row items-center justify-end ">
          {/* track order */}
          <div className="w-3/6">
            <NavLink
              to="/track-order"
              className="w-full aria-[current=page]:underline text-white flex flex-row gap-0 items-center justify-center"
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
          <div className="w-3/6 p-2 flex flex-col gap-0 justify-center items-center">
            {store.cart.items?.length>0 && (
              <p className="w-4 h-4 p-0 bg-white rounded-full flex items-center justify-center text-xs">
                {store.cart.items.length}
              </p>
            )}
            <Link to={"/cart"} className="">
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
        </div>
        {/* profile, login and register here */}
        <div className="w-full">
          {/* Auth NavLinks */}
          <div className=" sm:mt-0 flex flex-row gap-4 justify-end items-center">
            {store.user.name ? (
              <NavLink
                to="/profile"
                className="text-white hover:text-green-300 "
              >
                <div className="flex flex-col justify-center items-center m-0 h-10">
                  <img
                    src={profileImg}
                    alt="green-galaxy-profile-img"
                    className="w-10 m-0"
                  />
                  {store.user.name.slice(0, 10) + "..."}
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="text-green-600 text-sm hover:text-white bg-green-200 hover:bg-green-900 border border-white rounded-md px-4 py-2 transition duration-300 ease-in-out"
              >
                login
              </NavLink>
            )}
            {loggingOut ? (
              "loggingout..."
            ) : store.user?.name ? (
              <button
                onClick={logout}
                className="bg-red-600 text-white rounded-md h-fit w-fit px-4 py-2 text-sm hover:bg-white hover:text-red-600 transition ease-in-out duration-300"
              >
                Log out
              </button>
            ) : (
              <NavLink
                to="/register"
                className="bg-green-900 text-white hover:bg-green-200 text-sm hover:text-green-600 px-4 py-2 rounded-md transition duration-300 ease-in-out text-center"
              >
                register
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
