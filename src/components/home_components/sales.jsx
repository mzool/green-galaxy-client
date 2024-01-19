import bg from "../../assets/peakpx.jpg";
import { Link } from "react-router-dom";
function Sales() {
  return (
    <div
      className="w-11/12 h-[600px] m-auto rounded-lg grid grid-rows-2 gap-2 py-4 px-6 text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="h-full">
        {/* title */}
        <h1 className="font-bold text-4xl animate-bounce">Sales</h1>
        {/* description */}
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          quaerat et nostrum numquam itaque quos inventore eligendi magni non!
          Vitae qui ratione id reiciendis placeat rerum quo eius et numquam.
        </h2>
      </div>

      {/* action button */}
      <Link
        to={"/sales"}
        className="bg-green-50 border-2 border-green-100 px-4 py-2 rounded-lg hover:bg-white text-gray-700 font-semibold w-fit place-self-center"
      >
        shop all sales now!
      </Link>
    </div>
  );
}

export default Sales;
