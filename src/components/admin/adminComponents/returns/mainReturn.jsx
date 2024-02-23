import { useState } from "react";
import GetAllReturns from "./getAllReturns";
import NewReturn from "./newReturn";
function MainReturn() {
  const [toDo, setToDo] = useState("get-all");
  /// rendering
  return (
    <div className="flex flex-col gap-4 p-2 w-full bg-white text-gray-700">
      <div className="flex flex-row gap-2 w-full items-center justify-center">
        <button
          className="rounded-md bg-gray-700 text-white px-2 py-1"
          onClick={() => setToDo("get-all")}
        >
          All Returns
        </button>
        <button
          className="rounded-md bg-gray-700 text-white px-2 py-1"
          onClick={() => setToDo("new")}
        >
          Add new Return
        </button>
      </div>
      {toDo == "get-all"  && <GetAllReturns setToDo={setToDo} />}
      {toDo == "new" && <NewReturn setToDo={setToDo} />}
    </div>
  );
}

export default MainReturn;
