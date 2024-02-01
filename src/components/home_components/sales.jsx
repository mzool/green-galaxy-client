import bg from "../../assets/sales.png";
import { Link } from "react-router-dom";
function Sales() {
  return (
    <div className="w-full h-fit p-6 flex flex-col gap-2 ">
      <div className="p-2 rounded-md bg-green-50">
        {/* title */}
        <h1 className="font-bold text-4xl">Sales</h1>
        {/* description */}
        <h2>sales up to 50% on all our items</h2>
      </div>
      <img src={bg} alt="Green-Galaxy-sales" className="w-full h-[750px]"/>

      {/* action button */}
      <Link
        to={"/sales"}
        className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-500 
        text-white font-bold text-2xl place-self-center"
      >
        shop sales
      </Link>
    </div>
  );
}

export default Sales;
