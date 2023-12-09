import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "../assets/loading";
function TrackOrder() {
  //// order number variable
  let [orderNumber, setOrderNumber] = useState("");
  //// get order number from search params
  let [searchParams, setSearchParams] = useSearchParams();
  /// fetching
  let [isFetching, setFetching] = useState(false);
  /// submit button reference
  const subBtn = useRef();
  //// render the page depend on search params
  useEffect(() => {
    setOrderNumber(searchParams.get("order_number") || "");
    if (orderNumber) {
      subBtn.current.click();
    }
  }, []);
  //// track order function
  function trackOrder(e) {
    e.preventDefault();
    setFetching(true);
    //// fetch
    fetch(``, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `GreenBearer ${
          import.meta.env.VITE_authorization_token
        }`,
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ order_number: orderNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setFetching(false);
    setSearchParams({"order_number":orderNumber});
  }
  /////// rendering
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  return (
    <div className="w-full p-10 h-96 bg-white flex items-start justify-center ">
      {/* form that take order number and search for it  */}
      <form
        onSubmit={trackOrder}
        className="w-fit h-fit p-10 bg-green-600 rounded-lg flex flex-col gap-4 items-center justify-center"
      >
        <div className="flex items-center justify-center">
          <input
            id="orderNumber"
            type="text"
            placeholder="order_234XXX"
            className="p-4 rounded-lg outline-0 "
            value={orderNumber}
            onChange={(e) => {
              setOrderNumber(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            ref={subBtn}
            type="submit"
            className="p-4 rounded-lg bg-white text-green-700 px-6 hover:bg-zinc-100 transition duration-300"
          >
            track my order
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrackOrder;
