import { useState } from "react";

function PaymentPage(props) {
  /// chosen payment method
  let [paymentMethod, setMethod] = useState(null);

  /// get payment method rendering
  function handlPaymentMethod() {}
  /// rendering
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-gray-100 rounded-lg justify-center ">
      {/* title */}
      <div>
        <h2 className="text-green-700">
          please choose your payment method:
        </h2>
      </div>
      {/* payments methods */}
      {/* cash on delivery */}
      <div>
        <button className="p-2 rounded-md border-white bg-green-500 border-2 text-white w-fit hover:border-zinc-300 transition duration-300">
          cash on delivery
        </button>
      </div>
      {/* paypal */}
      <div>
        <button className="p-2 px-4 rounded-md border-white text-white bg-teal-500 border-2 w-fit hover:border-zinc-300 transition duration-300">
          paybal
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
