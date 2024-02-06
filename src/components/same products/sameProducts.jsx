import { useEffect, useState, useContext } from "react";
import ProductCard from "../product/product_card";
import theStore from "../../store/store.js";

function SameProcuts({ category, id }) {
  const { store } = useContext(theStore);
  const [sameProducts, setSameProducts] = useState([]);
  /// get the products with same category
  useEffect(() => {
    setSameProducts(
      store?.products?.filter((pr) => {
        return (pr.productCategory == category && pr.productId !== id);
      })
    );
  }, []);

  /// rendering
  if (sameProducts.length > 0) {
    return (
      <div className="flex flex-col gap-6 p-6  bg-gray-100 rounded-md">
        <p className="font-semibold text-gray-700 text-lg">
          People also Purchased:
        </p>
        <div className="w-full flex flex-row gap-4 rounded-md items-center justify-center">
          {sameProducts.map((pr) => (
            <ProductCard
              key={pr.productId}
              title={pr.productName}
              price={pr.productPrice}
              imageUrl={pr.productImgs[0]}
              productLink={`/products/${pr.productId}`}
              discount={pr.productDiscount}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SameProcuts;
