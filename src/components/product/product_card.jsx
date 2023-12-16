import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
function ProductCard({ title, price, imageUrl, productLink }) {
  /// get params and return the specific product
  let { productUrl } = useParams();
  let [url, setUrl] = useState(productUrl);
  /// rendering
  return (
    <div
      className="w-60 h-80 p-2 grid grid-rows-6 gap-4 text-center hover:bg-gray-300 transition duration-300 rounded-lg shadow-lg shadow-gray-300 bg-white border-2 border-green-300 transition duration-300 flex flex-col items-center justify-center"
      onClick={setUrl}
    >
      <Link to={productLink} className="w-full h-full row-span-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg row-span-3"
        />
      </Link>
      <div className="row-span-2 w-full h-full">
        <Link to={productLink}>
          <h2 className="text-md font-bold text-gray-600">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 mt-2">{price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
