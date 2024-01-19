import { useState, useEffect } from "react";
function ProductVarients({varients, selection}) {
  const [selectedVarient, setVarient] = useState("");
  //// selections
  useEffect(() => {
    selection((pr) => ({ ...pr, otherVarients: selectedVarient }));
  }, [selectedVarient]);
  //// rendering
  return (
    <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
      {varients.map((varient, index) => {
        return (
          <div
            key={index}
            className={`h-12 w-fit border border-gray-200 flex flex-col cursor-pointer p-2 items-center justify-center bg-gray-700 text-white rounded-md ${
              selectedVarient === varient
                ? "border-2 border-green-500"
                : selectedVarient
                ? "opacity-50"
                : null
            }`}
            onClick={() => setVarient(varient)}
          >
            {varient}
          </div>
        );
      })}
    </div>
  );
}

export default ProductVarients