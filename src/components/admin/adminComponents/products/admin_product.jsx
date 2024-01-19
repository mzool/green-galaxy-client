import AddProduct from "./addProduct";
import GetAllProduct from "./getAllProduct";
import { useState } from "react";
function AdminProducts() {
  /// what to do
  const [toDo, setToDo] = useState("all_products");
  /// style
  let style = {
    navDiv:
      "w-fit place-self-center h-fit text-sm text-white sm:flex sm:flex-row grid grid-cols-2 gap-5 justify-center items-center p-4",
    btn: "border-1 border-green-900 rounded-md bg-gray-600 text-sm text-white p-2 hover:bg-gray-800 transition ease-in-out duration-300",
  };
  ///// rendering
  return (
    <div className="flex flex-col gap-2 bg-white h-fit w-full p-4">
      {/* all products */}
      <div className={style.navDiv}>
        <div>
          <button className={style.btn} onClick={() => setToDo("all_products")}>
            all products
          </button>
        </div>
        {/* add product */}
        <div>
          <button className={style.btn} onClick={() => setToDo("add_product")}>
            add product
          </button>
        </div>
      </div>
      {/* main */}
      <div className="h-fit">
        {toDo === "add_product" && <AddProduct />}
        {toDo === "all_products" && <GetAllProduct />}
      </div>
    </div>
  );
}

export default AdminProducts;
