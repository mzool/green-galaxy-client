import { useState, useEffect } from "react";

function ProductSizes({ sizes, selection }) {
  const [selectedSize, setSize] = useState("");
  //// selections
  useEffect(() => {
    selection((pr) => ({ ...pr, size: selectedSize }));
  }, [selectedSize]);
  //// rendering
  return (
    <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
      {sizes.map((size, index) => {
        return (
          <div
            key={index}
            className={`min-w-12 w-fit border border-gray-200 flex flex-col cursor-pointer py-1 px-2 items-center justify-center bg-gray-700 text-white rounded-md ${
              selectedSize === size
                ? "border-2 border-green-500"
                : selectedSize
                ? "opacity-50"
                : null
            }`}
            onClick={() => setSize(size)}
          >
            {size}
          </div>
        );
      })}
    </div>
  );
}

export default ProductSizes;
