function OrderItems({ cart }) {
  const { items } = cart;
  const tax = cart.totalPrice * .16
  /// rendering
  if (items.length == 0) {
    return <div>no items in your cart</div>;
  }
  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg bg-white sm:flex-row"
          >
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={item.product.images[0]}
              alt={item.product.name}
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{item.product.name}</span>
              <span className="float-right text-gray-400">
                -{item.product.discount}%
              </span>
              <div className="flex flex-row gap-1">
                <p className="text-xs line-through text-red-500">
                  {item.product.price}$
                </p>
                <p className="text-lg">
                  {(
                    item.product.price *
                    (1 - item.product.discount / 100)
                  ).toFixed(2)}
                  $
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* total price */}
      <div className="w-fullS text-lg text-gray-700 p-2 text-center flex flex-col gap-2">
        <p>sales tax: 16%: {tax.toFixed(2)}$</p>
        <p>delivery cost: 5$</p>
        <p>total price:{(cart.totalPrice + 5 + tax).toFixed(2)}$</p>
      </div>
    </div>
  );
}

export default OrderItems;
