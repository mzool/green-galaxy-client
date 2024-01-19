function OrderData({ data, setOrderData }) {
  return (
    <div className="flex flex-col gap-4">
      {/* close */}
      <button
        className="px-4 py-2 rounded bg-gray-200 text-gray-800 w-fit border hover:border-black"
        onClick={() => setOrderData(null)}
      >
        return to all orders
      </button>
      {/* data section */}
      <div className="">

      </div>
    </div>
  );
}

export default OrderData;
