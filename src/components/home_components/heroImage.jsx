import { Link } from "react-router-dom";
import galaxy from "../../assets/galaxy.jpg";
import { useState } from "react";
const HeroImage = ({ link }) => {
  /// title
  const [title, setTitle] = useState("Welcome to Green Galaxy");
  return (
    <div
      className="h-screen w-full p-0"
      style={{
        backgroundImage: `url(${galaxy})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="black-filter bg-black bg-opacity-40 w-full min-h-full 
      h-full rounded-md z-2 py-6 hover:bg-opacity-0 transition ease-in-out duration-1000 flex justify-center items-center"
      >
        {link && (
          <div
            className="bg-white text-gray-700 text-lg rounded-md flex 
          flex-col gap-4 py-6 px-10 items-center justify-center transition ease-in-out duration-1000"
          >
            <h2>{title}</h2>
            <Link
              to={`${link}`}
              className="rounded-md bg-white text-center text-md text-green-700 py-2 px-10
               border-2 border-green-200 hover:border-green-500 hover:bg-white transition ease-in-out duration-300"
            >
              Shop All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroImage;
