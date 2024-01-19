import { useEffect, useState } from "react";
import ProductCard from "../product/product_card";
import getNewItems from "./functions/getNewProducts.js";

function NewProducts() {
  /// new items
  const [newItems, setNewItems] = useState([]);
  /// get new items
  useEffect(() => {
    getNewItems()
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNewItems(
            data.products.filter((pr) => {
              return pr.newProduct;
            })
          );
        }
      });
  }, []);
  /// rendering
  if (newItems.length === 0) {
    return <>loading...</>;
  }
  return (
    <div className="flex flex-col gap-4 w-full h-fit p-4 bg-gray-50">
      <h2 className="text-xl">New Items:</h2>
      {newItems.length > 0 && (
        <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
          {newItems.map((item) => (
            <ProductCard
              key={item.productId}
              title={item.productName}
              price={item.productPrice}
              imageUrl={item.productImgs[0]}
              productLink={`products/${item.productId}`}
              discount={item.productDiscount}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NewProducts;
