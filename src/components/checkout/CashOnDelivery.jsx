
const CODSection = () => {
  return (
    <div>
      <h2>
        Payment Method: Cash on Delivery
      </h2>
      <p className="text-gray-600 mb-4">
        Please make sure to have the exact amount in cash when our delivery
        person arrives.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={() => handleCODPayment()}
      >
        Place Order with COD
      </button>
    </div>
  );
};

export default CODSection;
