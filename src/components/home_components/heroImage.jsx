import heroImagTrees from "../../assets/heroImagTrees.png";
const HeroImage = () => {
  return (
    <div
      className="h-screen w-full p-0"
      style={{
        backgroundImage: `url(${heroImagTrees})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="black-filter bg-black bg-opacity-50 w-full min-h-full h-full rounded-md z-10 hover:bg-opacity-0 transition ease-in-out duration-1000 flex justify-center items-center">
        <div className="bg-green-100 bg-opacity-50 w-6/6 h-2/6 sm:h-2/6 sm:w-3/6 text-green-600 rounded-lg flex flex-row gab-2 p-2 items-center justify-center hover:bg-opacity-0 transition ease-in-out duration-1000">
          <div className="rounded-md bg-green-50 mr-2 text-center text-green-500 h-12 w-2/6 border-2 border-green-200 hover:border-green-500 hover:bg-white font-bold  transition ease-in-out duration-300">
            <button className="w-full h-full">First Action</button>
          </div>
          <div className="rounded-md bg-green-50 ml-2 text-center text-green-500 h-12 w-2/6 border-2 border-green-200 hover:border-green-500 hover:bg-white font-bold transition ease-in-out duration-300">
            <button className="h-full w-full">Second Action</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
