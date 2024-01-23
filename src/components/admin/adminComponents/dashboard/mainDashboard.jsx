import { useState } from "react";
import MainSales from "./sales/mainSales";
function MainDashboard() {
  /// to render
  const [element, setElement] = useState("sales");
  /// rendering
  return (
    <div className="grid grid-cols-8 w-full h-fit min-h-screen pt-2">
      {/* sidebar */}
      <div className="bg-gray-700 text-white w-fit p-4 flex flex-col gap-4 col-span-1">
        <div>
          <button
            className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 w-full rounded"
            onClick={() => setElement("sales")}
          >
            Sales
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 w-full rounded"
            onClick={() => setElement("inventory")}
          >
            Inventory
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 w-full rounded"
            onClick={() => setElement("customers")}
          >
            Customers
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 w-full rounded"
            onClick={() => setElement("finacial")}
          >
            Financial
          </button>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 w-full rounded"
            onClick={() => setElement("traffic")}
          >
            Traffic
          </button>
        </div>
      </div>
      {/* main page */}
      <div className=" p-2 bg-white col-span-7 ">
        {element == "sales" && <MainSales/>}
      </div>
    </div>
  );
}

export default MainDashboard;
