import colors from "../templates/colors.json";
import HeroImage from "../components/home_components/heroImage";
////////////////////////////////
const Home = () => {

  
  return (
    <div
      className={`w-full min-h-screen h-fit bg-${colors.mainBackgroundColor} text-${colors.mainTextColor}`}
    >
      <HeroImage />
    </div>
  );
};

export default Home;
