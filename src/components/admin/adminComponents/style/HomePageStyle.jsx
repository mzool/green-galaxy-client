import { useState } from "react";
import HeroImageComponent from "./homeStyleComponents/heroImageComponent";
import SalesComponent from "./homeStyleComponents/salesComponent";
function HomePageStyle() {
  //// hero image values
  const [heroImage, setHeroImage] = useState({
    title: "",
    image: {},
    actionButton: {
      text: "",
      URL: "",
      bgColor: "",
      textColor: "",
    },
  });
  //// sales
  const [sales, setSales] = useState({
    title: "",
    description: "",
    image: {},
    actionButton: {
      text: "",
      URL: "",
      bgColor:"",
      textColor:""
    },
  });

  /// rendering
  return (
    <div className="w-full grid grid-rows-4 gap-4 h-full">
      {/* hero image */}
      <HeroImageComponent setHeroImage={setHeroImage} heroImage={heroImage} />
      {/* sales */}
      <SalesComponent sales={sales} setSales={setSales} />
      {/* blog */}
      <div>3</div>
      {/* why green galaxy */}
      <div>4</div>
    </div>
  );
}

export default HomePageStyle;
