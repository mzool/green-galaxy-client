import HeroImage from "../components/home_components/heroImage";
import getLocation from "../functions/getLocation.js";
import { useEffect } from "react";
////////////////////////////////
const Home = () => {
  /// get location
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div
      className={`w-full min-h-screen h-fit bg-white text-gray-600`}
    >
      <HeroImage />
    </div>
  );
};

export default Home;
