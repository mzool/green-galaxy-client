import { useState } from "react";

function Checkout() {
  /// discount code
  let [discountCode, setDiscountCode] = useState("");
  /// is fitching for rendering
  let [isFetching, setIsFetching] = useState(false);
  /// msgs
  let [message, setMsg] = useState({
    err: "",
    msg: "",
  });
  /// handle discount submit
  function getDiscount(e) {
    e.preventDefault();
    /// regix to check discount code
    const dRegex = /^[a-zA-Z0-9]+$/;
    const checker = dRegex.test(discountCode);
    if (checker == false) {
      setMsg({
        err: "invalid discount code",
        msg: "",
      });
      return;
    } else {
      /// fetch the server for the code
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_get_discount_code
        }`,
        {
          method: "post",
          mode: "cors",
          headers: {
            "content-type": "apllication/json",
          },
          body: JSON.stringify({ discountCode }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMsg({
              err: "",
              msg: discountCode,
            });
          } else {
            setMsg({
              err: "invalid discount code",
              msg: "",
            });
            return;
          }
        });
    }
    ////
  }
  return (
    <div className="grid grid-cols-2 gap-0 w-full p-0 h-fit min-h-screen">
      <div className="bg-white w-full p-4 h-fit min-h-screen"></div>
      <div className="bg-green-50 w-full p-4 h-fit min-h-screen flex flex-col gap-2 justify-center items-center ">
        {/* display cart items */}
        <div></div>
        {/* display discount form */}
        <div className="w-full h-fit p-2 flex items-center justify-center">
          <form
            onSubmit={getDiscount}
            className="flex flex-col w-full h-fit p-2 items-center justify-center "
          >
            {/* discount code */}
            <div className="w-full flex items-center justify-end">
              <input
                type="text"
                placeholder="discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                required
                className="outline-0 p-2 w-full sm:w-5/6 md:w-4/6 border-zinc-200 border-2 rounded-md hover:border-teal-300 focus:border-teal-300 transition duration-300"
              />
            </div>
            {/* message */}
            <div className="w-full flex items-center justify-end p-2">
              {message.err && <p className="text-red-500">{message.err}</p>}
              {message.msg && <p className="text-teal-600">{message.msg}</p>}
            </div>
            {/* submit */}
            <div className="w-full flex items-center justify-end">
              <button
                type="submit"
                className="w-5/6 sm:w-3/6 md:w-2/6 border-zinc-300 border-2 bg-green-200 rounded-md p-2 text-zinc-600 hover:border-zinc-500 transition duration-300"
              >
                apply
              </button>
            </div>
          </form>
        </div>
        {/* total price after discount */}
        <div className="w-full flex items-center justify-start m-4 text-zinc-500 p-4">
          <h1> total price:</h1>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
