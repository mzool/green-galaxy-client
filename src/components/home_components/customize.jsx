import { Link } from "react-router-dom";
import bg from "../../assets/peakpx.jpg";

function Customize() {
  return (
    <div className="sm:grid sm:grid-cols-2 flex flex-row sm:gap-0 gap-2 p-4 sm:h-[700px] h-fit rounded-lg">
      {/* description */}
      <div className="sm:h-[600px] h-fit py-10 px-6 flex flex-col gap-10 bg-green-50 font-semibold text-lg rounded-lg">
        <h2>Customize your Itmes!</h2>
        <p>
          Unlock your creativity with Green Galaxy! Design your own masterpiece,
          and let us bring it to life and deliver it right to your doorstep.
          Experience the freedom of customization – try it now and make every
          creation uniquely yours
        </p>
        <Link
          to={"/customize-your-itmes"}
          className="w-fit h-fit py-2 px-6 border-green-500 bg-gray-700 text-white rounded-lg place-self-center"
        >
          Try Now !
        </Link>
      </div>
      {/* image or video */}
      <div
        className="rounded-lg h-[600px]"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
    </div>
  );
}

export default Customize;
