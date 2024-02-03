import { useState, useEffect } from "react";

function Filter({ getFilteredProduct, productsData }) {
  /// filter functionality
  const [filter, setFilter] = useState({
    price: "",
    category: "",
  });
  const [allCategories, setAllCategories] = useState([]);
  /// get all categories
  useEffect(() => {
    let categories = [];
    productsData.forEach((pr) => {
      if (!categories.includes(pr.productCategory)) {
        categories.push(pr.productCategory);
      }
    });
    setAllCategories(categories);
   
  }, [productsData]);
  /// msg
  const [msg, setMsg] = useState("");
  ///
  const [searching, setSearching] = useState(false);
  //////////////// handle filter
  function getFiltered(e) {
    e.preventDefault();
    if (!filter.category && !filter.price) {
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
          setFilter({ price: "", category: ""});
        }
      })
      .finally(() => {
        setSearching(false);
        setFilter({ price: "", category: ""});
      });
  }
  //// rendering
  return (
    <div className="w-fit py-2 px-6 bg-gray-100 text-md text-gray-600 rounded-lg h-fit flex flex-col gap-2">
      {/* title */}
      <h1 className="text-xl">filter:</h1>
      {/* form */}
      <form
        className="flex flex-row flex-wrap gap-2 items-center justify-center"
        onSubmit={getFiltered}
      >
        {/* price */}
        <div className="price flex flex-row flex-wrap gap-2 items-center justify-center">
          <label htmlFor="maxPrice">maximum price:</label>
          <input
            id="maxPrice"
            type="number"
            value={filter.price}
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            className="rounded-lg bg-white text-gray-600 outline-0 p-1 text-center"
          />
        </div>
        {/* category */}
        <div className="category h-fit flex flex-row flex-wrap gap-2 items-center justify-center">
          <label htmlFor="category">category:</label>
          <select
            name="category"
            id="category"
            onChange={(e) =>
              setFilter((pr) => ({ ...pr, category: e.target.value }))
            }
            className="p-2 rounded-md bg-white text-gray-700"
            value={filter.category}
          >
            <option value="">select wanted category</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* submit */}
        <div className="w-3/6">
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
