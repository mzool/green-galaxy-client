import { useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmOrder from "./confirmOrder";
function PaymentPage(props) {
  /// get cart id
  const { cart_id } = useParams();
  /// payment method
  let [method, setMethod] = useState("");
  /// get last info
  const { shippingInfo, items, totalPrice } = props;
  /// is fetching for rendering
  let [isFetching, setFetching] = useState(false);
  
  /// rendering
  if (method){
    return <ConfirmOrder info = {shippingInfo} totalPrice={totalPrice} payment_method={method} items = {items} cart_id={cart_id}/>
  }
  ///////////
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-gray-100 rounded-lg justify-center ">
      {/* title */}
      <div>
        <h2 className="text-green-700">please choose your payment method:</h2>
      </div>
      {/* payments methods */}
      {/* cash on delivery */}
      <div>
        <button
          onClick={()=>{setMethod("cash")}}
          className="p-2 rounded-md border-white bg-green-500 border-2 text-white w-fit hover:border-zinc-300 transition duration-300"
        >
          Cash on delivery
        </button>
      </div>
      {/* paypal */}
      <div>
        <button
          onClick={()=>{setMethod("paypal")}}
          className="p-2 px-4 rounded-md border-white text-white bg-teal-500 border-2 w-fit hover:border-zinc-300 transition duration-300"
        >
          Paypal
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
