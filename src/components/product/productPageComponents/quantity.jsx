import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function Quantity({ selection }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    selection((pr) => ({ ...pr, quantity }));
  }, [quantity]);

  function increase() {
    setQuantity((pr) => pr + 1);
  }
  function decrease() {
    if (quantity <= 1) {
      return setQuantity(1);
    }
    setQuantity((pr) => pr - 1);
  }

  //// rendering
  return (
    <div
      className="w-fit px-2 py-1 flex flex-row font-semibold text-gray-700
     items-center justify-center border border-gray-700 rounded-md 
     "
    >
      <FaMinus
        className="text-green-600 hover:text-green-800 cursor-pointer"
        onClick={decrease}
      />
      <div className="px-4 py-2 w-40 text-center ">{quantity}</div>
      <FaPlus
        className="text-green-600 hover:text-green-800 cursor-pointer"
        onClick={increase}
      />
    </div>
  );
}

export default Quantity;
