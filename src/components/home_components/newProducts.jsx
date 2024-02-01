import { useEffect, useContext } from "react";
import ProductCard from "../product/product_card";
import getNewItems from "./functions/getNewProducts.js";
import theStore from "../../store/store.js";

function NewProducts() {
  const { store } = useContext(theStore);
  /// get new items
  useEffect(() => {
    if (store.newProducts.length > 0) {
      return;
    }
    getNewItems()
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          store.updateNewProducts(
            data.products.filter((pr) => {
              return pr.newProduct;
            })
          );
        }
      });
  }, []);

  /// rendering
  if (store.newProducts.length === 0) {
    return <>loading...</>;
  }
  return (
    <div className="flex flex-col gap-4 w-full h-fit p-4">
      <h2 className="text-xl w-full bg-green-50 p-2 rounded-md">New Items:</h2>
      {store.newProducts.length > 0 && (
        <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
          {store.newProducts.map((item) => (
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
