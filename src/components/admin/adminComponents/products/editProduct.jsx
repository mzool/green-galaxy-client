import { useState } from "react";
import DeleteProduct from "./deleteProduct";
import EditProductFrom from "./editProductFrom";
import editProductHandler from "../../admin-functions/editProduct.js";

function EditProduct({ product, setSearch }) {
  const [msg, setMsg] = useState("");
  const [isFetching, setFetching] = useState(false);
  /// initial values
  const initialValues = {
    productName: "",
    productDescription: "",
    productBrand: "",
    productPrice: "",
    productCategory: "",
    colors: [],
    sizes: [],
    otherVarients: [],
    productStock: "",
    productDiscount: "",
    isMadeToOrder: "",
    newProduct: "",
    deleteExistingImages: "",
  };
  const [productImgs, setImgs] = useState([]);
  //// handle editing
  function handleSubmit(values) {
    setFetching(true);
    /// get all edited values
    let allValidValues = {};
    for (const value in values) {
      if (Array.isArray(values[value]) && values[value].length > 0) {
        allValidValues[value] = values[value];
      } else if (values[value] && !Array.isArray(values[value])) {
        allValidValues[value] = values[value];
      }
    }
    /// form data
    const formData = new FormData();
    for (const key in allValidValues) {
      // If the value is an array, append each item individually
      if (Array.isArray(allValidValues[key])) {
        allValidValues[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        // If the value is not an array, append it as is
        formData.append(key, allValidValues[key]);
      }
    }
    /// get images
    if (productImgs.length > 0) {
      productImgs.forEach((image) => {
        formData.append("images", image);
      });
    }
    /// append id
    formData.append("productId", product);
    /// fetch server
    editProductHandler(formData)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          values = {
            productName: "",
            productDescription: "",
            productBrand: "",
            productPrice: "",
            productCategory: "",
            colors: [],
            sizes: [],
            otherVarients: [],
            productStock: "",
            productDiscount: "",
            isMadeToOrder: "",
            newProduct: "",
            deleteExistingImages: "",
          };
        }
        setMsg(data.message);
      });
  }
  //// rendering
  return (
    <div className="">
      <div onClick={() => setSearch("")}>
        <button className="p-2 bg-green-600 text-white rounded-lg">
          go to all products page
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 h-fit p-10">
        <div className="bg-white p-8 rounded-md shadow-md w-full h-fit">
          <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
          <EditProductFrom
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            id={product}
            setImgs={setImgs}
            msg={msg}
            isFetching={isFetching}
          />
        </div>
      </div>

      {/* delete product */}
      <div className="">
        <DeleteProduct productId={product} setSearch={setSearch} />
      </div>
    </div>
  );
}

export default EditProduct;
