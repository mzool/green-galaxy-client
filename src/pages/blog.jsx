import { useEffect, useContext } from "react";
import LoadingSpinner from "../assets/loading";
import { Link, useSearchParams } from "react-router-dom";
import theStore from "../store/store.js";
function Blog() {
  /// store
  const { store } = useContext(theStore);
  /// search
  let [search, setSearch] = useSearchParams({
    page: 1,
    limit: 10,
    blog_id: null,
  });
  /// get all blogs
  useEffect(() => {
    window.scrollTo(0, 0);
    if (store.blogs.length == 0) {
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_get_all_blogs
        }`,
        {
          mode: "cors",
          method: "get",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            store.updateBlogs(data.data);
          } else {
            throw new Error("There are no blogs now, try again in future.");
          }
        });
    }
  }, [store]);
  /// more Blogs
  function moreBlogs() {
    let page = JSON.parse(search.get("page"));
    let limit = JSON.parse(search.get("limit"));

    setSearch({ page: page++, limit, blog_id: "" });
  }
  /// rendering
  if (store.blogs.length == 0) {
    return <LoadingSpinner color={"green-600"} />;
  }
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full p-6">
      {/* header */}
      <div className="text-2xl bg p-4 sm:w-3/6 flex flex-wrap text-center text-gray-600 shadow-2xl rounded-lg">
        <h1>
          Hello! Welcome to Green Galaxy Blog. Explore, Discover, and Delight in
          Our Stories and Blogs
        </h1>
      </div>
      {/* all blogs section */}
      <div className="h-fit w-full bg-white p-6 grid sm:grid-cols-2 gap-4 w-full items-center justify-center">
        {store.blogs.map((blog, index) => {
          return (
            <Link
              to={`/blogs/${blog.blog_id}`}
              key={index}
              className={`w-full h-96 p-4 rounded-lg text-gray-600 grid sm:grid-rows-6
               gap-2 items-center justify-center cursor-pointer hover:contrast-150 transition duration-300`}
            >
              {/* image */}
              <div className="row-span-5 w-full h-full">
                <img
                  src={blog.CoverImage}
                  alt={blog.title}
                  className="h-full w-full rounded"
                />
              </div>
              <div className="row-span-1 p-2">
                {/* title */}
                <h2>{blog.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
      {/* more blogs */}
      <button
        className="w-full h-10 bg-gray-100 flex items-center justify-center p-4 hover:bg-gray-200 transition ease-on-out duration-300"
        onClick={moreBlogs}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="green"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
    </div>
  );
}

export default Blog;
