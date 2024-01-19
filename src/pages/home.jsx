import HeroImage from "../components/home_components/heroImage";
import getLocation from "../functions/getLocation.js";
import { useEffect, useRef, useContext } from "react";
import NewProducts from "../components/home_components/newProducts.jsx";
import WhoWeAre from "../components/home_components/whoWeAre.jsx";
import Sales from "../components/home_components/sales.jsx";
import Customize from "../components/home_components/customize.jsx";
//import OurBlog from "../components/home_components/ourBlog.jsx"
import getHomeStyle from "../style/getHomeStyle.js";
import theStore from "../store/store.js";
////////////////////////////////
const Home = () => {
  //// store
  const { store } = useContext(theStore);
  //// reference for home page elements
  const newProducts = useRef(null);
  const hero = useRef(null);
  const whoWeAre = useRef(null);
  const sales = useRef(null);
  const customize = useRef(null);
  //const ourBlog = useRef(null);
  //// get style   /// get location
  useEffect(() => {
    getHomeStyle(store);
    // setTimeout(() => {
    //   getLocation();
    // }, 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );
    observer.observe(newProducts.current);
    observer.observe(hero.current);
    observer.observe(whoWeAre.current);
    observer.observe(sales.current);
    observer.observe(customize.current);
    //observer.observe(ourBlog.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`w-full min-h-screen h-fit bg-white text-gray-600 flex flex-col gap-6`}
    >
      <div ref={hero} className="opacity-0 transtion ease-in-out duration-700">
        <HeroImage />
      </div>
      <div
        ref={newProducts}
        className="opacity-0 transtion ease-in-out duration-700"
      >
        <NewProducts />
      </div>
      {/* sales */}
      <div ref={sales} className="opacity-0 transtion ease-in-out duration-700">
        <Sales />
      </div>
      {/* customize */}
      <div
        ref={customize}
        className="opacity-0 transtion ease-in-out duration-700"
      >
        <Customize />
      </div>
      {/*go to our blog*/}
      {/* <div
        ref={ourBlog}
        className="opacity-0 transtion ease-in-out duration-700"
      >
        <OurBlog />
      </div> */}
      {/* who we are*/}
      <div
        ref={whoWeAre}
        className="opacity-0 transtion ease-in-out duration-700"
      >
        <WhoWeAre />
      </div>
    </div>
  );
};

export default Home;
