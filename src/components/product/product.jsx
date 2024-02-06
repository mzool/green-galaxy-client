import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../assets/loading";
import Reviews from "../reviews/reviews";
import SameProcuts from "../same products/sameProducts";
import getProductData from "../../functions/getSingleProductData.js";
import ProductColors from "./productPageComponents/productColors.jsx";
import ProductSizes from "./productPageComponents/productSizes.jsx";
import ProductImages from "./productPageComponents/productImages.jsx";
import ProductVarients from "./productPageComponents/productVarients.jsx";
import PaymentOptions from "./productPageComponents/paymentOptions.jsx";
import Rating from "./productPageComponents/rating.jsx";
import MadeWhenOrder from "./productPageComponents/madeWhenOrder.jsx";
import Quantity from "./productPageComponents/quantity.jsx";
import addToCart from "../../functions/addToCart.js";
import TagsForSEO from "../utilities/reactHelmet.jsx";

function Product() {
  /// navigate
  const navigate = useNavigate();
  /// get the product url
  const { productUrl } = useParams();
  /// user selections
  const [userSelections, setSelections] = useState({});
  //// loading
  const [loading, setLoading] = useState(true);
  /// adding to cart inorder to render button
  const [addingToCart, setAddingToCart] = useState(false);
  //// wrong message
  const [message, setMessage] = useState("");
  /// get the product data
  const [product, setProduct] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getProductData(productUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setProduct(data.data);
          setSelections({ productId: data.data.productId });
        } else {
          navigate("/all-products");
        }
      })
      .finally(() => setLoading(false));
  }, [productUrl]);

  //// handle add to cart
  function handleAddToCart() {
    setAddingToCart(true);
    if (
      (product.colors?.length > 0 && !userSelections.color) ||
      (product.sizes?.length > 0 && !userSelections.size) ||
      (product.otherVarients?.length > 0 && !userSelections.otherVarients)
    ) {
      setAddingToCart(false);
      return setMessage("please choose all available options");
    }
    setMessage("");
    /////// fetch to server
    addToCart(userSelections)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/cart");
        }
      })
      .finally(() => {
        setAddingToCart(false);
      });
  }
  //// rendering
  if (loading) {
    return <LoadingSpinner color={"green-600"} />;
  }
  if (product.productName)
    return (
      <div className="flex flex-col gap-6 p-4">
        <TagsForSEO
          title={product.productName}
          pageURL={`https://green-galaxy.net/products/${product.productId}`}
          descriptionOfThePage={`${product.productDescription}`}
          urlToImageDescripeThePage={product.productImgs[0]}
        />
        <div className="sm:grid sm:grid-cols-2 flex flex-col gap-6 p-4">
          {/********************************** images at left half**********************************/}
          <ProductImages
            images={product.productImgs}
            name={product.productName}
          />
          {/********************************** information at right half **********************************/}
          <div>
            {/********************************** first product name **********************************/}
            <div className="p-2  font-bold text-gray-700 text-2xl flex flex-row gap-6">
              <h2>{product.productName}</h2>
              {product.productDiscount > 0 ? (
                <div className="flex flex-row gap-2">
                  <p className="text-sm text-red-600 line-through">
                    {product.productPrice}$
                  </p>
                  <p className="text-md text-gray-700">
                    {(
                      product.productPrice *
                      ((100 - product.productDiscount) / 100)
                    ).toFixed(2)}
                    $
                  </p>
                </div>
              ) : (
                <p>{product.productPrice}</p>
              )}
            </div>
            {/********************************** product description **********************************/}
            <div className="p-2 font-semibold text-gray-700 text-lg">
              {product.productDescription}
            </div>
            {/*********************************** made to order  ***********************************/}
            {product.isMadeToOrder && <MadeWhenOrder />}
            {/********************************** product rating **********************************/}
            <Rating />
            {/********************************** product colors **********************************/}
            {product.colors?.length > 0 && (
              <div className="p-2 flex flex-col gap-2">
                <h2 className="font-bold text-lg text-gray-700">Colors:</h2>
                <ProductColors
                  colors={product.colors}
                  selection={setSelections}
                />
              </div>
            )}
            {/********************************** product sizes **********************************/}
            {product.sizes?.length > 0 && (
              <div className="p-2 flex flex-col gap-2">
                <h2 className="font-bold text-lg text-gray-700">
                  Pick a Size:
                </h2>
                <ProductSizes sizes={product.sizes} selection={setSelections} />
              </div>
            )}
            {/********************************** product varients *********************************/}
            {product.otherVarients?.length > 0 && (
              <div className="p-2 flex flex-col gap-2">
                <h2 className="font-bold text-lg text-gray-700">
                  Choose one of these options:
                </h2>
                <ProductVarients
                  varients={product.otherVarients}
                  selection={setSelections}
                />
              </div>
            )}
            {/*********************************** Quantity ***********************************/}
            <Quantity selection={setSelections} />
            {/*********************************** wrong message  ***********************************/}
            {message && (
              <div className="w-full text-red-500 p-2 ">{message}</div>
            )}
            {/*********************************** add to cart  ***********************************/}
            <div className="w-full py-2 px-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-teal-600 text-white rounded-lg p-2 text-lg mt-6 hover:bg-teal-800 transition ease-in-out duration-300"
              >
                {addingToCart
                  ? "adding the item to your cart..."
                  : "add to cart"}
              </button>
            </div>
            {/*********************************** payment options  ***********************************/}
            {/* <PaymentOptions /> */}
          </div>
        </div>
        {/*********************************** reviwes  ***********************************/}
        {/* <Reviews /> */}
        {/*********************************** users also purchase  ***********************************/}
        <SameProcuts
          category={product.productCategory}
          id={product.productId}
        />
      </div>
    );
}

export default Product;
