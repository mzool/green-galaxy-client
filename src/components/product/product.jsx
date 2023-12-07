import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../assets/loading";
import Reviews from "../reviews/reviews";
import SameProcuts from "../same products/sameProducts";
function Product() {
  /// navigate
  let navigate = useNavigate();
  /// session expired when session expired=> user need to login or user will be consider as a guist
  let [session, setSession] = useState(true);
  /// get the product url
  let { productUrl } = useParams();
  /// get the product data
  let [product, setProduct] = useState({});
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_one_product
      }`,
      {
        method: "get",
        mode: "cors",
        credentials: "include",
        headers: {
          productId: productUrl,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setProduct(data.data);
        } else {
          navigate("/all-products");
        }
      });
  }, [productUrl]);
  /// get colors
  let [color, setColor] = useState("");
  function getColor(e) {
    const colors = document.getElementsByClassName("_colors");
    Object.keys(colors).forEach((clr) => {
      colors[clr].id === e.target.id
        ? colors[clr].classList.add("border-green-500")
        : colors[clr].classList.remove("border-green-500");
    });
    setColor(e.target.id);
  }
  /// get sizes
  let [size, setSize] = useState("");
  function getSize(e) {
    const _sizes = document.getElementsByClassName("_sizes");
    Object.keys(_sizes).forEach((s) => {
      _sizes[s].id === e.target.id
        ? _sizes[s].classList.add("border-green-500")
        : _sizes[s].classList.remove("border-green-500");
    });
    setSize(e.target.id);
  }
  /// other varients
  let [varients, setVarients] = useState("");
  function getVarients(e) {
    const _var = document.getElementsByClassName("_var");
    Object.keys(_var).forEach((v) => {
      _var[v].id === e.target.id
        ? _var[v].classList.add("border-green-500")
        : _var[v].classList.remove("border-green-500");
    });
    setVarients(e.target.id);
  }
  /// number of items
  let [numOfItems, setNumOfItems] = useState(1);
  function getItems(e) {
    if (e.target.value > 0 && e.target.value < 100) {
      setNumOfItems(e.target.value);
    } else if (e.target.value >= 100) {
      setNumOfItems(99);
    } else {
      setNumOfItems(1);
    }
  }
  /// delete cart cookie
  function deleteCart() {
    setIsFetching(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_delete_cart
      }`,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: `GreenBearer ${
            import.meta.env.VITE_authorization_token
          }`,
        },
        body: JSON.stringify({
          method: "cookie",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMsg("Thank you, you can add items as a guist now");
          setSession(true);
          setIsFetching(false);
        }
      });
  }
  /// add to cart
  /// msgs
  let [msg, setMsg] = useState("");
  //// loader when fetching
  let [isFetching, setIsFetching] = useState(false);
  /// when add a product to cart show message
  let [added, setAdded] = useState(false);
  function addToCart() {
    setIsFetching(true);
    /// check for all varients
    try {
      if (
        (!color && document.getElementsByClassName("_colors").length) ||
        (!size && document.getElementsByClassName("_sizes").length) ||
        (!varients && document.getElementsByClassName("_var").length)
      ) {
        setIsFetching(false);
        return setMsg("please choose all varients");
      }
      /// define cart value
      let items = {
        productId: product.productId,
        color,
        size,
        otherVarients: varients,
        quantity: numOfItems,
      };
      /// fetch post to server
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_add_to_cart
        }`,
        {
          method: "post",
          mode: "cors",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            Authorization: `GreenBearer ${
              import.meta.env.VITE_authorization_token
            }`,
          },
          body: JSON.stringify({ items }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success == true) {
            setAdded(true);
            setMsg("");
            setIsFetching(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setTimeout(() => {
              setAdded(false);
            }, 10000);
          } else {
            setMsg(data.error);
            setIsFetching(false);
            setSession(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  //////// rendering //////////
  if (product.productImgs?.length > 0) {
    return (
      <div className="flex flex-col gap-2 p-4">
        {/* success message div */}
        {added && (
          <div className="w-full p-2 h-fit bg-gradient-to-r from-green-300 to-green-500 rounded-md text-white flex flex-col  items-center justify-center">
            <div className="flex items-center justify-center flex-row">
              <p> item is in your cart </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center flex-row">
              <p> visit your cart page</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
          </div>
        )}

        <div className="flex flex-col bg-white w-full h-fit min-h-screen p-4 mt-10">
          {/* images div */}

          <div className="flex justify-center items-center w-full h-3/6 flex-col gap-10 sm:flex-row ">
            {product.productImgs.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img}
                  alt={product.productName}
                  className="rounded-lg w-full sm:w-1/6  hover:scale-110  sm:hover:scale-150 hover:border hover:border-green-600 transition ease-in-out duration-500"
                />
              );
            })}
          </div>
          <div className="w-full p-2 h-fit bg-white flex flex-col gap-4 justify-center items-center text-lg sm:text-2xl text-green-600 mt-10">
            {/* product name */}
            <div className="w-full h-fit flex justify-center items-center bg-zinc-100">
              <h1>{product.productName}</h1>
            </div>
            {/* product description */}
            <div className="w-full h-fit flex justify-center items-center">
              {product.productDescription}
            </div>
            {/* product brand */}
            <div className="flex flex-col gap-4 items-center">
              <h2>brand:</h2>
              {product.productBrand}
            </div>
            {/* varients */}
            {/* colors */}
            <div className="w-full h-fit flex justify-center items-center flex-col gap-4">
              <div>{product.colors.length > 0 && <h2>colors:</h2>}</div>
              {product.colors.length > 0 && (
                <div className=" flex flex-row gap-4 ">
                  {product.colors.map((color) => {
                    return (
                      <button
                        onClick={getColor}
                        key={color}
                        id={color}
                        className="_colors w-12 h-6 rounded-md border-zind-200 border-2 hover:scale-110 transition ease-in-out duration-300 shadow-green-500 shadow-sm hover:shadow-lg hover:shadow-green-500"
                        style={{ background: color }}
                      ></button>
                    );
                  })}
                </div>
              )}
              {/* sizes */}
              {product.sizes.length > 0 && (
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    <h2>Sizes: </h2>
                  </div>
                  <div className="flex flex-row gap-4">
                    {product.sizes.map((size, index) => {
                      return (
                        <button
                          id={size}
                          onClick={getSize}
                          key={index}
                          className="_sizes w-fit h-fit border-2  p-1 rounded-lg hover:scale-110 transition ease-in-out duration-300 shadow-green-500 shadow-sm hover:shadow-lg hover:shadow-green-500"
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* other varients */}
              {product.otherVarients.length > 0 && (
                <div className="flex flex-col gap-4 items-center">
                  <div>
                    <h2>varients: </h2>
                  </div>
                  <div className="flex flex-row gap-4">
                    {product.otherVarients.map((varient, index) => {
                      return (
                        <button
                          id={varient}
                          onClick={getVarients}
                          key={index}
                          className="_var w-fit h-fit border-2  p-1 rounded-lg hover:scale-110 transition ease-in-out duration-300 shadow-green-500 shadow-sm hover:shadow-lg hover:shadow-green-500"
                        >
                          {varient}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {/* number of items */}
            <div className="w-1/6 flex flex-col gap-4 mt-5">
              <label htmlFor="items">number of items:</label>
              <input
                id="items"
                type="number"
                min={1}
                max={100}
                value={numOfItems}
                onChange={getItems}
                className="w-full h-fit outline-0 border-2 border-zinc-200 rounded-lg text-center number-input"
              />
            </div>
            {msg && (
              <div className="w-full text-red-500 flex flex-col gap-4 mt-5">
                {msg}
              </div>
            )}
            {!session && (
              <div className="flex flex-col gap-2 w-full">
                <Link
                  to={"/login"}
                  className="p-2 bg-green-500 text-white rounded-lg text-center w-3/6 hover:bg-opacity-80 transition duration-300"
                >
                  login
                </Link>
                <button
                  disabled={isFetching}
                  className="p-2 bg-teal-500 text-white rounded-lg w-3/6 hover:bg-opacity-80 transition duration-300"
                  onClick={deleteCart}
                >
                  continue as a guist
                </button>
              </div>
            )}
            <div className="flex flex-row gap-4 mt-8">
              <div>
                <button
                  disabled={isFetching}
                  onClick={addToCart}
                  className="p-4 w-fit h-fit rounded-lg border-2 border-zinc-200 text-md bg-green-600 text-white shadow-sm shadow-green-500 hover:scale-120 hover:shadow-lg hover:shadow-green-500 transition ease-in-out duration-300"
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
          <SameProcuts />
          <Reviews />
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner color="green-500" />;
  }
}

export default Product;
