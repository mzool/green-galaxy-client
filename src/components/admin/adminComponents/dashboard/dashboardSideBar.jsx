function DashboardSideBar({ setElement }) {
  return (
    <div className="flex flex-col gap-4 bg-gray-700 p-2 w-full rounded text-white">
      <button className="w-full hover:bg-gray-500 rounded-md px-2 py-1" onClick={() => setElement("sales")}>
        Sales
      </button>

      <button className="w-full hover:bg-gray-500 rounded-md px-2 py-1" onClick={() => setElement("carts")}>
        Cart
      </button>

      {/* <button className="w-full hover:bg-gray-500 rounded-md px-2 py-1" onClick={() => setElement("stock")}>
        Stock
      </button> */}

      <button className="w-full hover:bg-gray-500 rounded-md px-2 py-1" onClick={() => setElement("users")}>
        Users
      </button>

      <button className="w-full hover:bg-gray-500 rounded-md px-2 py-1" onClick={() => setElement("orders")}>
        Orders
      </button>
    </div>
  );
}

export default DashboardSideBar;
