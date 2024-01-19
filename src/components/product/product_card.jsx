import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
function ProductCard({ title, price, imageUrl, productLink, discount }) {
  /// get params and return the specific product
  let { productUrl } = useParams();
  let [url, setUrl] = useState(productUrl);
  /// rendering
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 text-md">
            <Link to={productLink}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </Link>
          </h3>
        </div>
        {discount > 0 ? (
          <div className="flex flex-row gap-2">
            <p className="text-sm text-red-600 line-through">
              {price}$
            </p>
            <p className="text-md text-gray-700">{(price * ((100-discount) /100 )).toFixed(2)}$</p>
          </div>
        ) : (
          {price}
        )}
      </div>
    </div>
  );
}

export default ProductCard;
