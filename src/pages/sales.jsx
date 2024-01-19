import { useState } from "react";
import getAllProducts from "../functions/getAllProducts.js";
import { useEffect } from "react";
import ProductCard from "../components/product/product_card.jsx";
import LoadingSpinner from "../assets/loading.jsx";
function Sales() {
  /// sales items
  const [onSaleItems, setItems] = useState([]);
  /// fetch server
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    getAllProducts()
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(
            data.products.filter((item) => {
              return item.productDiscount > 0;
            })
          );
        }
      })
      .finally(() => setFetching(false));
  }, []);
  /// rendering
  if (fetching) {
    return <LoadingSpinner color={"green-600"} />;
  }
  return (
    <div className="bg-white w-full h-fit p-4 flex flex-col gap-10 text-center min-h-screen text-lg text-gray-700">
      <h2>All Sales Items:</h2>
      {onSaleItems.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
          {onSaleItems.map((item) => (
            <ProductCard
              key={item.productId}
              title={item.productName}
              price={item.productPrice}
              imageUrl={item.productImgs[0]}
              productLink={`../products/${item.productId}`}
            />
          ))}
        </div>
      ) : (
        <p>no items on sales now, come back later.</p>
      )}
    </div>
  );
}

export default Sales;
