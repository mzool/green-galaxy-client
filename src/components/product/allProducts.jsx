import { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../assets/loading";
import ProductCard from "./product_card";
import { useSearchParams } from "react-router-dom";
import theStore from "../../store/store";
function AllProducts() {
  /// the store
  let store = useContext(theStore);
  /// search params
  let [searchParams, setSearchParams] = useSearchParams({ page: 1, limit: 20 });

  /// all product variable
  let [allProduct, setAllProduct] = useState([]);
  /// fetch all product api
  let [startFetching, setStartFetching] = useState(false);
  useEffect(() => {
    const credentials = btoa("greengalaxy:apipasswordgreengalaxy");
    setStartFetching(true);
    /// fetch
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_all_products
      }?page=${parseInt(searchParams.get("page"))}&limit=${parseInt(
        searchParams.get("limit")
      )}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: credentials,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true && data.data.length > 0) {
          setAllProduct(data.data);
          store.store.updateProducts(data.data);
        } else {
          setAllProduct([]);
        }
        setStartFetching(false);
      });
  }, [searchParams]);
  /// page control
  function increase() {
    setSearchParams({
      page: parseInt(searchParams.get("page")) + 1,
      limit: parseInt(searchParams.get("limit")),
    });
  }
  function decrease() {
    if (parseInt(searchParams.get("page")) > 1) {
      setSearchParams({
        page: parseInt(searchParams.get("page")) - 1,
        limit: parseInt(searchParams.get("limit")),
      });
    }
  }
  /// filter functionality
  let [filter, setFilter] = useState({
    price: "",
    category: "",
    color: "",
  });
  function getFiltered(e) {
    e.preventDefault();
    console.log(filter);
  }
  /// when start fetching
  if (startFetching && allProduct.length === 0) {
    return <LoadingSpinner color={"green-600"} />;
  }
  /// if no products found
  if (allProduct.length === 0 && startFetching === false) {
    return (
      <div className="text-green-500 flex flex-col h-screen justify-center items-center text-2xl bg-white w-full h-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
        <p>
          No products are available at the moment. Please check back later for
          updates, or explore our other product categories.
        </p>

        <div className="flex flex-row gap-4 bg-white mt-5 mb-5 w-full h-10 justify-center items-center p-1">
          <div className="flex justify-center items-center">
            <button onClick={decrease}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="green"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div className="text-green-600 flex justify-center items-center font-bold text-lg">
            page: {parseInt(searchParams.get("page"))}
          </div>
        </div>
      </div>
    );
  }

  ///////// render products
  return (
    <div className="h-fit w-full bg-white flex flex-col items-center ">
      {/* filter component ***************************************************************************************/}
      <div className="w-full h-fit mt-1 mb-1 bg-green-100 rounded-lg text-green-800 p-2 flex flex-col gap-2">
        <h1 className="text-xl">filter:</h1>
        <form
          action=""
          className="flex flex-row w-full p-1 gap-2 justify-center items-center h-full"
          onSubmit={getFiltered}
        >
          <div className="price w-1/6">
            <input
              type="number"
              placeholder="maximum price"
              value={filter.price}
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
              className="rounded-lg bg-white text-green-600 border border-1 border-green-600 outline-0 p-2 text-center w-full"
            />
          </div>
          <div className="category w-1/6">
            <input
              type="text"
              placeholder="category"
              className="rounded-lg bg-white text-green-600 border border-1 border-green-600 outline-0 p-2 text-center w-full"
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
            />
          </div>
          <div className="color w-1/6">
            <input
              type="text"
              placeholder="Color"
              className="rounded-lg bg-white text-green-600 border border-1 border-green-600 outline-0 p-2 text-center w-full"
              value={filter.color}
              onChange={(e) => setFilter({ ...filter, color: e.target.value })}
            />
          </div>
          <div className="w-1/6 flex items-center justify-center">
            <input
              type="submit"
              value={"Filter"}
              className="rounded-lg border border-green-500 border-2 p-2 w-full bg-white hover:bg-green-200 hover:border-white transition ease-in-out duration-300"
            />
          </div>
        </form>
      </div>
      {/* all products  ********************************************************************************************************8*/}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 p-5 gap-5 w-full h-fit justify-center items-center">
        {allProduct.map((product) => {
          return (
            <ProductCard
              key={product.productId}
              title={product.productName}
              price={product.productPrice}
              imageUrl={product.productImgs[0]}
              productLink={`/products/${product.productId}`}
            />
          );
        })}
      </div>
      {/* page controllers  */}
      <div className="flex flex-row gap-4 bg-white mt-5 mb-5 w-full h-10 justify-center items-center p-1">
        <div className="flex justify-center items-center">
          <button onClick={decrease}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="text-green-600 flex justify-center items-center font-bold text-lg">
          page: {parseInt(searchParams.get("page"))}
        </div>
        <div className="flex justify-center items-center">
          <button onClick={increase}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-1o h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
