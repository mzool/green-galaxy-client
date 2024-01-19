import { Link } from "react-router-dom";
import heroImagTrees from "../../assets/heroImagTrees.png";
import { useState } from "react";
const HeroImage = () => {
  /// title
  const [title, setTitle] = useState("Welcome to Green Galaxy")
  return (
    <div
      className="h-screen w-full p-0"
      style={{
        backgroundImage: `url(${heroImagTrees})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="black-filter bg-black bg-opacity-50 w-full min-h-full h-full rounded-md z-2 py-6 hover:bg-opacity-0 transition ease-in-out duration-1000 flex justify-center items-center">
        <div className="bg-green-50 text-gray-700 font-bold text-4xl rounded-lg flex flex-col gab-6 py-6 px-10 items-center justify-center transition ease-in-out duration-1000">
          <h2>{title}</h2>
          <Link
            to={"/all-products"}
            className="rounded-lg bg-green-50 text-center text-lg text-green-600 py-2 px-10 border-2 border-green-200 hover:border-green-500 hover:bg-white font-bold  transition ease-in-out duration-300"
          >
            Shop All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
