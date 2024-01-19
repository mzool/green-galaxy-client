import { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../assets/loading";
import ProductCard from "./product_card";
import theStore from "../../store/store";
import Filter from "./filter";
function AllProducts() {
  /// the store
  const { store } = useContext(theStore);
  /// products
  const [filteredProducts, setFilteredProduct] = useState([]);
  /// products number conroll
  const [query, setQuery] = useState({ page: 1, limit: 10, started: false });
  /// fetch all product api
  const [startFetching, setStartFetching] = useState(false);
  //// msg
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (query.started || store.products.length == 0) {
      setStartFetching(true);
      //////////// get products from server
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_all_products
        }?page=${query.page}&limit=${query.limit}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `GreenBearer ${
              import.meta.env.VITE_authorization_token
            }`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true && data.products.length > 0) {
            store.updateProducts(data.products);
          } else {
            setMsg("no more items available now");
          }
          setQuery((pr) => ({
            ...pr,
            started: false,
          }));
          setStartFetching(false);
        });
    }
  }, [query]);
  //// get more items
  function getMore() {
    setQuery((pr) => ({
      ...pr,
      page: pr.page + 1,
      limit: pr.limit,
      started: true,
    }));
  }
  /// when start fetching
  if (startFetching && store.products.length === 0) {
    return <LoadingSpinner color={"green-600"} />;
  }
  //// filtered products
  if (filteredProducts.length > 0) {
    return (
      <div className="flex flex-col gap-4 p-4 text-gray-700">
        <h2 className="text-xl">Filtered Items:</h2>
        <button
          onClick={() => setFilteredProduct([])}
          className="px-6 py-2 rounded-md bg-green-600 text-white w-fit  hover:bg-green-800 transition duration-300"
        >
          back to all products page
        </button>
        <div className="flex sm:flex-row sm:flex-wrap flex-col p-2 gap-6 w-full h-fit justify-center items-center">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.productId}
              title={product.productName}
              price={product.productPrice}
              imageUrl={product.productImgs[0]}
              productLink={`/products/${product.productId}`}
              discount={product.productDiscount}
            />
          ))}
        </div>
      </div>
    );
  }
  ///////// render products
  return (
    <div className="h-fit w-full bg-white flex flex-col items-center gap-4 p-4">
      {/* filter component ***************************************************************************************/}
      <Filter getFilteredProduct={setFilteredProduct} />
      {/* all products  ********************************************************************************************************8*/}
      <div className="flex sm:flex-row sm:flex-wrap flex-col p-2 gap-10 bg-gray-100 w-full h-fit justify-center items-center">
        {store.products.map((product) => {
          return (
            <ProductCard
              key={product.productId}
              title={product.productName}
              price={product.productPrice}
              imageUrl={product.productImgs[0]}
              productLink={`/products/${product.productId}`}
              discount={product.productDiscount}
            />
          );
        })}
      </div>
      {/* page controllers  */}
      <div className="w-full flex item-center p-0 m-2">
        <button
          disabled={startFetching ? startFetching : msg ? true : false}
          className={`text-white text-center py-2 px-4 bg-gray-600 w-full hover:bg-gray-500 transition duration-300 ${
            msg && "opacity-50"
          }`}
          onClick={getMore}
        >
          {msg ? msg : startFetching ? "..." : "more items"}
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
