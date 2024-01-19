import { useState } from "react";

function Filter({ getFilteredProduct }) {
  /// filter functionality
  const [filter, setFilter] = useState({
    price: "",
    category: "",
    color: "",
  });
  /// msg
  const [msg, setMsg] = useState("");
  ///
  const [searching, setSearching] = useState(false);
  //////////////// handle filter
  function getFiltered(e) {
    e.preventDefault();
    if (!filter.category && !filter.color && !filter.price) {
      return setMsg("no filter option filled");
    }
    setSearching(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_filter_products
      }`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `GreenBearer ${
            import.meta.env.VITE_authorization_token
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify(filter),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getFilteredProduct(data.filteredProducts);
        } else {
          setMsg("No items found, try to search for less parameters");
        }
      })
      .finally(() => {
        setSearching(false);
        setFilter({ price: "", category: "", color: "" });
      });
  }
  //// rendering
  return (
    <div className="w-fit py-2 px-6 bg-gray-100 text-md text-gray-600 rounded-lg h-fit flex flex-col gap-2">
      {/* title */}
      <h1 className="text-xl">filter:</h1>
      {/* form */}
      <form
        className="grid sm:grid-cols-4 gap-2 h-fit items-center justify-center"
        onSubmit={getFiltered}
      >
        {/* price */}
        <div className="price w-full">
          <input
            type="number"
            placeholder="maximum price"
            value={filter.price}
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="rounded-lg bg-white text-gray-600 outline-0 p-2 text-center w-full"
          />
        </div>
        {/* category */}
        <div className="category w-full h-fit">
          <input
            type="text"
            placeholder="category"
            className="rounded-lg bg-white text-gray-600 outline-0 p-2 text-center w-full"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          />
        </div>
        {/* color */}
        <div className="color w-full h-fit">
          <input
            type="text"
            placeholder="Color"
            className="rounded-lg bg-white text-gray-600 outline-0 p-2 text-center w-full"
            value={filter.color}
            onChange={(e) => setFilter({ ...filter, color: e.target.value })}
          />
        </div>
        {/* submit */}
        <div className="w-full">
          <input
            disabled={searching}
            type="submit"
            value={searching ? "filtering..." : "filter"}
            className="rounded-lg p-1 w-full bg-gray-600 text-white border-2 border-white hover:border-green-500 transition ease-in-out duration-300"
          />
        </div>
      </form>
      <h2 className="text-red-500 m-2">{msg}</h2>
    </div>
  );
}

export default Filter;
