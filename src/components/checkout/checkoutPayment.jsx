import { useState } from "react";
import ConfirmOrder from "./confirmOrder";
function PaymentPage(props) {
  /// payment method
  let [method, setMethod] = useState("");
  /// get last info
  const { shippingInfo, items, totalPrice, cartId } = props;
  /// is fetching for rendering
  let [isFetching, setFetching] = useState(false);
  /// rendering
  if (method){
    return <ConfirmOrder info = {shippingInfo} totalPrice={totalPrice} payment_method={method} items = {items} cartId={cartId}/>
  }
  ///////////
  return (
    <div className="flex flex-col gap-4 w-full p-4 rounded-lg justify-center">
      {/* title */}
      <div>
        <h2 className="text-gray-600 bg-gray-100 p-2 rounded-lg">please choose your payment method:</h2>
      </div>
      {/* payments methods */}
      {/* cash on delivery */}
      <div className="w-full ">
        <button
          onClick={()=>{setMethod("cash")}}
          className="p-2 rounded-lg border-white bg-green-600 border-2 text-white w-full hover:border-gray-500 transition duration-300"
        >
          Cash on delivery
        </button>
      </div>
      {/* paypal */}
      {/* <div className="w-full">
        <button
          onClick={()=>{setMethod("paypal")}}
          className="p-2 px-4 rounded-lg border-white text-white bg-teal-500 border-2 w-full hover:border-gray-500 transition duration-300"
        >
          Paypal
        </button>
      </div> */}
    </div>
  );
}

export default PaymentPage;
