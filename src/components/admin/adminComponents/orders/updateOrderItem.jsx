import { useState } from "react";
import updateOrderVarient from "./ordersFunctions/updateOrderVarient.js";
import CopyToClipboardSection from "./copyToClipBoard.jsx";
function UpdateOrderVarient({ data }) {
  ///
  const [itemId, setItemId] = useState("");
  const [fetching, setIsFetching] = useState(false);
  const [msg, setMsg] = useState("");
  const [othterVerients, setOtherVarients] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  /// handle submit
  function handleVarientSubmit(e) {
    e.preventDefault();
    setIsFetching(true);
    updateOrderVarient(
      data?.order_id,
      itemId,
      othterVerients,
      color,
      quantity,
      size
    )
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message || "somthing error");
      })
      .finally(() => {
        setIsFetching(false);
      });
  }
  //// rendering
  return (
    <div className="flex flex-col gap-2 w-full rounded-md bg-gray-100 text-gray-700 p-4">
      <h2>copy items id:</h2>
      <CopyToClipboardSection
        content={data.items.map((item) => ({ _id: item._id, name:item.product.productName }))}
      />
      <h2 className="font-bold text-center">update order varient:</h2>
      <form
        onSubmit={handleVarientSubmit}
        className="flex flex-row flex-wrap gap-4 items-center"
      >
        {/* get all order items ids */}
        <label htmlFor="itemId">item:</label>
        <select
          name="itemId"
          id="itemId"
          className="px-4 py-2 rounded-md"
          onChange={(e) => setItemId(e.target.value)}
        >
          <option value="">choose the item</option>
          {data?.items?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.product.productName}
            </option>
          ))}
        </select>
        {/* color */}
        {itemId && (
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="color">change item color:</label>
            <select
              name="color"
              id="color"
              className="px-4 py-2 rounded-md"
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="">select color:</option>
              {data.items?.map((item) => {
                if (item._id == itemId)
                  return item.product.colors?.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ));
              })}
            </select>
          </div>
        )}
        {/* size */}
        {itemId && (
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="size">change item size:</label>
            <select
              name="size"
              id="size"
              className="px-4 py-2 rounded-md"
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">select size:</option>
              {data.items?.map((item) => {
                if (item._id == itemId)
                  return item.product.sizes?.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ));
              })}
            </select>
          </div>
        )}
        {/* other Varients */}
        {itemId && (
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="otherVarients">change item varients:</label>
            <select
              name="otherVarients"
              id="otherVarients"
              className="px-4 py-2 rounded-md"
              onChange={(e) => setOtherVarients(e.target.value)}
            >
              <option value="">select other Varients:</option>
              {data.items?.map((item) => {
                if (item._id == itemId)
                  return item.product.otherVarients?.map((otherVarients) => (
                    <option key={otherVarients} value={otherVarients}>
                      {otherVarients}
                    </option>
                  ));
              })}
            </select>
          </div>
        )}
        {/* quanitity */}
        <div>
          <label htmlFor="quantity">change quantity:</label>
          <input
            type="number"
            min={1}
            className="px-4 py-2 rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {/* submit */}
        {fetching ? (
          <div className="rounded-full border-b border-t animate-spin border-green-600 h-6 w-6"></div>
        ) : (
          <input
            type="submit"
            value={"apply changes"}
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
          />
        )}{" "}
      </form>
      {msg && <div className="w-full bg-white p-2">{msg}</div>}
    </div>
  );
}

export default UpdateOrderVarient;
