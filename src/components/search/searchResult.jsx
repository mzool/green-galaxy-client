import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../assets/loading";
import handleSearch from "../../functions/handleSearch.js";
import ProductCard from "../product/product_card.jsx";
function SearchResult() {
  /// get search params
  let [searchFor, setSearchFor] = useSearchParams();
  /// result
  let [searchResult, setSearchResult] = useState([]);
  /// is fetching
  let [isFetching, setFetching] = useState(true);
  /// fetching search api
  useEffect(() => {
    setFetching(true);
    const search = searchFor.get("searchFor");
    if (!search) {
      return;
    } else {
      handleSearch(search.trim(), setSearchResult);
    }
    setFetching(false);
  }, [searchFor]);
  /// rendering
  if (isFetching) {
    return <LoadingSpinner color={"green-500"} />;
  }
  if (searchResult.products == 0 && searchResult.blogs == 0 && !isFetching) {
    return (
      <div className="h-fit min-h-screen p-4 flex items-center justify-center flex-col gap-6 text-green-600 ">
        no search result
      </div>
    );
  }
  return (
    <div className="h-fit min-h-screen p-4 flex items-center justify-start flex-col gap-6 text-green-600 ">
      {/* product result */}
      <div className="flex flex-row w-full p-4 flex-wrap gap-4">
        <h2 className="w-full bg-zinc-50 ">Products:</h2>
        {searchResult.products >0 &&
          searchResult.result.productsSearch.map((result, index) => {
            return (
              <div key={index}>
                <ProductCard
                  title={result.productName}
                  price={result.productPrice}
                  productLink={`../products/${result.productId}`}
                  imageUrl={result.productImgs[0]}
                />
              </div>
            );
          })}
      </div>

      {/* blogs result */}
      <div className="flex flex-row w-full p-4 flex-wrap gap-4">
        <h2 className="w-full bg-zinc-50 ">Blogs:</h2>
        {searchResult.blogs > 0 &&
          searchResult.result.blogsSearch.map((result, index) => {
            return (
              <Link
                to={`../blogs/${result.blog_id}`}
                key={index}
                className="w-full p-4 flex items-start justify-center flex-col gap-4 bg-zinc-50 rounded-lg hover:bg-zinc-200"
              >
                <img
                  src={result.CoverImage}
                  alt={result.title}
                  className="w-36"
                />
                <h2> {result.title}</h2>
                <p>
                  {" "}
                  {result.body.substring(0, result.body.indexOf(".")) + "...."}
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default SearchResult;
