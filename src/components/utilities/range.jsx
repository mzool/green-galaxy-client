import { useState } from "react";

const Slider = () => {
  const [value, setValue] = useState(50);

  const handleSliderChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="p-4">
      <label htmlFor="slider" className="block text-gray-700">
        Slider Value: {value}
      </label>
      <input
        type="range"
        id="slider"
        name="slider"
        min="0"
        max="100"
        value={value}
        onChange={handleSliderChange}
        className="mt-2"
      />
      <div
        className={`
          "w-full h-4 bg-blue-500",
          "rounded-full mt-2",
          "transition-all duration-300",
          { "bg-red-500": value > 75, "bg-green-500": value < 25 }
        `}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default Slider;
