import { useState, useEffect } from "react";
import LoadingSpinner from "../../../../assets/loading";
import EditProduct from "./editProduct";
import getAllProducts from "../../admin-functions/getAllProducts.js";
function GetAllProduct() {
  //// search
  const [search, setSearch] = useState("");
  /// get products
  let [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    getAllProducts()
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);
  /// generate and download excel file
  async function download() {
    const url = `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
      import.meta.env.VITE_allProducts_excel
    }`;
    const filename = "products.xlsx";

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials:"include"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();

      // Create a link element and trigger the download
      const a = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);

      a.href = objectUrl;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  ///style
  const style = {
    table:
      "w-full h-fit min-h-screen bg-white p-4 rounded-md flex flex-col gap-1",
    titleRow:
      "grid grid-cols-8 border-b-2 border-zinc-400 w-full text-center gap-0",
    cells: "p-1 w-full text-sm bg-white",
    productsInfo: "grid grid-cols-8",
    btn: "bg-gray-500 text-white text-center hover:bg-gray-700 ",
    title:"p-1 bg-gray-500 text-white"
  };

  /// rendering
  if (search) {
    return <EditProduct product={search} setSearch={setSearch} />;
  }

  if (allProducts.length > 0) {
    return (
      <div className={style.table}>
        <div className={style.titleRow}>
          <div className={style.title}>click on number to edit or delete product</div>
          <div className={style.title}>product ID</div>
          <div className={style.title}>product name</div>
          <div className={style.title}>product category</div>
          <div className={style.title}>brand</div>
          <div className={style.title}>price</div>
          <div className={style.title}>discount</div>
          <div className={style.title}>stock</div>
        </div>
        {allProducts.map((pr, index) => {
          return (
            <div className={style.titleRow} key={index}>
              <button
                className={style.btn}
                onClick={() => {
                  setSearch(pr.productId);
                }}
                id={pr.productId}
              >
                {index + 1}
              </button>
              <div className={style.cells}>{pr.productId}</div>
              <div className={style.cells}>{pr.productName}</div>
              <div className={style.cells}>{pr.productCategory}</div>
              <div className={style.cells}>{pr.productBrand}</div>
              <div className={style.cells}>{pr.productPrice}</div>
              <div className={style.cells}>{pr.productDiscount} %</div>
              <div className={style.cells}>{pr.productStock}</div>
            </div>
          );
        })}
        <div className={style.btn}>
          <button type="button" onClick={download}>
            downlaod all products as excel file
          </button>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner color={"green-500"} />;
  }
}

export default GetAllProduct;
