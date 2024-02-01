import HeroImage from "../components/home_components/heroImage";
import getLocation from "../functions/getLocation.js";
import { useEffect, useContext } from "react";
import NewProducts from "../components/home_components/newProducts.jsx";
import WhoWeAre from "../components/home_components/whoWeAre.jsx";
import Sales from "../components/home_components/sales.jsx";
import theStore from "../store/store.js";
import OurBlog from "../components/home_components/ourBlog.jsx";
////////////////////////////////
const Home = () => {
  //// store
  const { store } = useContext(theStore);

  //// get style   /// get location
  useEffect(() => {
    setTimeout(() => {
      getLocation();
    }, 3000);
  }, []);

  return (
    <div
      className={`w-full min-h-screen h-fit bg-white text-gray-700 flex flex-col gap-6 items-center justify-center`}
    >
      <HeroImage link={"/all-products"} />
      <NewProducts />
      <Sales />
      <OurBlog />
      <WhoWeAre />
    </div>
  );
};

export default Home;
