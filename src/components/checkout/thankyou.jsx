import { FaCheckCircle } from "react-icons/fa"; // You may need to install this package

const ThankYou = ({ orderNumber }) => {
  /// rendering
  return (
    <div className="container mx-auto mt-8 text-center flex flex-col gap-2">
      <FaCheckCircle className="text-green-500 text-5xl mb-4" />
      <h1 className="text-3xl font-semibold mb-4">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-6">
        Your order has been successfully placed. We appreciate your business!
      </p>
      <p>your order number: {orderNumber}</p>
      <p>you can use order number for track your order</p>
      <p>Invoice will be available after order completed </p>
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        <a
          href="/all-products"
          className="text-green-700 rounded-md bg-gray-100 p-2 hover:bg-gray-200 w-fit"
        >
          Continue Shopping
        </a>
        <a
          href="/"
          className="text-green-700 rounded-md bg-gray-100 p-2 hover:bg-gray-200 w-fit"
        >
          home
        </a>
      </div>
    </div>
  );
};

export default ThankYou;
