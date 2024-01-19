import { useState } from "react";
import deleteProduct from "../../admin-functions/deleteProduct.js";
function DeleteProduct({ productId, setSearch }) {
  const [confirmProduct, setConfirmProduct] = useState("");
  const [msg, setMsg] = useState("");
  ////////////// handle delete function
  function handleDelete(e) {
    e.preventDefault();
    if (productId != confirmProduct) {
      return setMsg("invalid product id");
    } else {
      setMsg("deleting product...");
      deleteProduct(productId, confirmProduct)
        .then((res) => res.json())
        .then((data) => {
          setMsg(data.message);
        })
        .finally(() => {
          setSearch("");
        });
    }
  }
  //// rendering
  return (
    <div className="w-full py-2 px-6 bg-red-100 b-2 b-gray-500 rounded-lg text-gray-700">
      <form className="w-full p-2 flex flex-col gap-2" onSubmit={handleDelete}>
        <label htmlFor="confirmProduct">write the product id:</label>
        <input
          className="w-full rounded-lg p-2 "
          type="text"
          id="confirmProduct"
          value={confirmProduct}
          onChange={(e) => setConfirmProduct(e.target.value)}
        />
        <p>{msg}</p>
        <input
          type="submit"
          value={"delete"}
          className="bg-red-600 text-white hover:bg-red-800 border-gray-500 rounded-lg p-2"
        />
      </form>
    </div>
  );
}

export default DeleteProduct;
