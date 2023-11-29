import { Link } from "react-router-dom";
import colors from "../../templates/colors.json";
import { useParams } from "react-router-dom";
import { useState } from "react";
import cookie from "../../functions/cookies.js";
function ProductCard({ title, price, imageUrl, productLink }) {
  /// get params and return the specific product
  let { productUrl } = useParams();
  let [url, setUrl] = useState(productUrl);

  /// add to cart function
  function addToCart(e) {
 
  }

  /// rendering
  return (
    <div
      className="w-80 h-fit p-2 text-center rounded-lg shadow-md shadow-green-600 hover:shadow-lg hover:shadow-green-600 bg-white hover:rotate-1 transition duration-500 flex flex-col items-center justify-center"
      onClick={setUrl}
    >
      <Link to={productLink}>
        <img
          src={imageUrl}
          alt={title}
          className="w-96 h-48 object-cover rounded-lg "
        />
      </Link>
      <div className="mt-4">
        <Link to={productLink}>
          <h2 className="text-xl font-semibold text-green-600 hover:text-teal-400 transition">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 mt-2">{price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
