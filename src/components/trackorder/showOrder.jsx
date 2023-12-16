function OrderInfo(props) {
  const {
    order_number,
    fullName,
    address,
    totalPrice,
    paid,
    payment_method,
    phone_number,
    items,
    status
  } = props;
  //// rendering

  return (
    <div className="w-full h-fit p-4 flex items-center justify-center">
      <div className="h-fit min-h-screen w-full sm:w-3/6 md:w-2/6 flex flex-col gap-2 text-white bg-green-600 p-4 rounded-lg">
        <div className="flex flex-col gap-2">{order_number}</div>
        <hr />
        <div className="flex flex-col gap-2 ">
          <h2>Order Status: </h2>
          {status}
        </div>
        <hr />
        <div className="flex flex-col gap-2 ">
          <h2>name: </h2>
          {fullName}
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <h2>Address:</h2>
          {address}
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <h2>Total price:</h2>
          {totalPrice}
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <h2>Paid:</h2>
          {paid == false ? "no" : "yes"}
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <h2>Payment method:</h2>
          {payment_method}
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <h2>Phone:</h2>
          {phone_number}
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <h2>items:</h2>
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 bg-zinc-50 rounded-lg p-4 justify-start items-center w-full text-green-600"
              >
                <p>name: {item.name}</p>
                {item.brand && <p>brand: {item.brand}</p>}
                <p>price: {item.price}</p>
                <p>quantity: {item.quantity}</p>
                <img src={item.image} alt={item.name} className="w-12" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
