import { useEffect, useState } from "react";
import ImageSlider from "./imageSlider";
function ProductImage({ images, name }) {
  //// eventlistener to window resizing
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  /// rendering
  /// for mobile devices
  if (width <= 650) {
    return<ImageSlider images={images}/>;
  }
  //// fro big screens
  return (
    <div className="w-full h-fit min-h-screen bg-white py-4 px-2 flex flex-col gap-2">
      <img src={images[0]} alt={`Green-Galaxy-${name}`} />
      <div className="w-full flex flex-row flex-wrap gap-4 h-fit">
        {images.slice(1).map((img, index) => {
          return (
            <img
              key={index}
              src={img}
              className="rounded-lg  basis-1/3 w-80 h-96"
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductImage;
