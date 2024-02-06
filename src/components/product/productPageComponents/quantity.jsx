import { useState, useEffect } from "react";
function Quantity({ selection }) {
  /// get quantity
  const [quantity, setQuantity] = useState(1);
  //// selections
  useEffect(() => {
    selection((pr) => ({ ...pr, quantity: quantity }));
  }, [quantity]);
  //// handle quantity
  function handleQuantity(e) {
    const value = e.target.value;
    if (value <= 0) {
      return setQuantity(1);
    }
    if (value > 100) {
      return setQuantity(100);
    }
    setQuantity(value);
  }

  //// rendering
  return (
    <div className="w-full p-4 flex flex-col gap-4 font-semibold text-lg text-gray-700 ">
      <h2>Number of Items:</h2>
      <input
        type="number"
        className="p-2 rounded-lg border-2 border-gray-700 text-black text-center w-full"
        value={quantity}
        onChange={(e) => handleQuantity(e)}
      />
    </div>
  );
}

export default Quantity;
