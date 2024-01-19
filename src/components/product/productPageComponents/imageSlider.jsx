// src/components/ImageSlider.js
import { useState } from "react";
import LeftArrow from '../../../assets/leftArrow';
import RightArrow from '../../../assets/rightArrow'
const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full p-2">
      <div>
        <img src={images[currentImage]} alt="Green Galaxy Product" />
      </div>
      <button
        onClick={prevImage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
      >
        <LeftArrow color={"gray"} w={12} h={12} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
      >
        <RightArrow color={"gray"} w={12} h={12} />
      </button>
    </div>
  );
};

export default ImageSlider;
