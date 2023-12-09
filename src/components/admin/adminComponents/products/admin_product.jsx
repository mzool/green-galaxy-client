import AddProduct from "./addProduct";
import GetAllProduct from "./getAllProduct";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
function AdminProducts() {
  /// set search params
  let [seachParams, setSearchParams] = useSearchParams({
    page: "products",
    toDo: "all-products",
  });
  let [productComponent, setProductComponent] = useState(seachParams.get("toDo"));
/// controll rendering
useEffect(()=>{
    setProductComponent(seachParams.get("toDo"));
},[seachParams])
/// style
let style={
    navDiv: "w-full place-self-center h-fit text-sm text-green-900 sm:flex sm:flex-row grid grid-cols-2 gap-5 justify-center items-center p-4",
    btn: "border-1 border-green-900 rounded-md bg-green-900 text-sm text-white p-2 hover:bg-green-600 transition ease-in-out duration-300"
};

  return (
    <div className="flex flex-col gap-2 bg-white h-fit w-full p-4">
      {/* all products */}
      <div className={style.navDiv}>
        <div>
          <button
            className={style.btn}
            onClick={() =>
              setSearchParams({ page: "products", toDo: "all-products" })
            }
          >
            all products
          </button>
        </div>
        {/* add product */}
        <div>
          <button
            className={style.btn}
            onClick={() =>
              setSearchParams({ page: "products", toDo: "add-products" })
            }
          >
            add product
          </button>
        </div>
       
      </div>
      {/* main */}
      <div className="h-fit">
        {productComponent === "add-products" && <AddProduct />}
        {productComponent === "all-products" && <GetAllProduct />}
      </div>
    </div>
  );
}

export default AdminProducts;
