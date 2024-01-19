import { useEffect, useState } from "react";
import Check from "../../../assets/check";
function ProductColors({ colors, selection }) {
  const [selectedColor, setColor] = useState("");

  useEffect(() => {
    selection(pr=>({...pr, color:selectedColor }))
  }, [selectedColor]);
  //// rendering
  return (
    <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className={`h-12 w-12 border border-gray-200 cursor-pointer flex items-center justify-center rounded-md ${
              selectedColor === color
                ? "border-2 border-green-500"
                : selectedColor
                ? "opacity-50"
                : null
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
          >
            {selectedColor === color ? (
              <Check color={selectedColor === "black" ? "white" : "black"} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default ProductColors;
