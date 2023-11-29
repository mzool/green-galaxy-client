import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../../../assets/loading";
import EditProduct from "./editProduct";

function GetAllProduct() {
  //// use search params
  let [search, setSearch] = useSearchParams({
    page: "products",
    toDo: "all-products",
  });
  /// get products
  let [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_all_products_admin
      }`,
      {
        method: "get",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);
  /// generate and download excel file
  function download() {
    const a = document.createElement("a");
    a.setAttribute(
      "href",
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_allProducts_excel
      }`
    );
    a.setAttribute("download", "all_products.xlsx");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("done");
  }
  ///style
  let [style, setStyle] = useState({
    table:
      "w-full h-fit min-h-screen bg-white p-4 rounded-md flex flex-col gap-1",
    titleRow:
      "grid grid-cols-8 border-b-2 border-zinc-400 w-full text-center gap-0",
    titles: "border-2 border-zinc-400 m-0 w-full text-sm bg-zinc-100",
    productsInfo: "grid grid-cols-8",
    btn: "bg-green-500 text-white text-center hover:bg-green-700 border-b-2 border-zinc-400 ",
  });
  /// when click on the number go to edit page for that product
  function editProduct(e) {
    setSearch({
      page: "products",
      toDo: "all-products",
      productId: e.target.id,
    });
  }
  /// rendering
  if (search.get("productId") && allProducts.length > 0) {
    let product;
    allProducts.forEach((pr) => {
      if (pr.productId === search.get("productId")) product = pr;
    });
    return <EditProduct product={product} />;
  }

  if (allProducts.length > 0) {
    return (
      <div className={style.table}>
        <div className={style.titleRow}>
          <div className={style.titles}>number</div>
          <div className={style.titles}>product ID</div>
          <div className={style.titles}>product name</div>
          <div className={style.titles}>product category</div>
          <div className={style.titles}>brand</div>
          <div className={style.titles}>price</div>
          <div className={style.titles}>discount</div>
          <div className={style.titles}>stock</div>
        </div>
        {allProducts.map((pr, index) => {
          return (
            <div className={style.titleRow} key={index}>
              <button
                className={style.btn}
                onClick={editProduct}
                id={pr.productId}
              >
                {index + 1}
              </button>
              <div className={style.titles}>{pr.productId}</div>
              <div className={style.titles}>{pr.productName}</div>
              <div className={style.titles}>{pr.productCategory}</div>
              <div className={style.titles}>{pr.productBrand}</div>
              <div className={style.titles}>{pr.productPrice}</div>
              <div className={style.titles}>{pr.discount}</div>
              <div className={style.titles}>{pr.productStock}</div>
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
