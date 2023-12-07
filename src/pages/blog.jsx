import { useEffect, useState } from "react";
import LoadingSpinner from "../assets/loading";
import { Link, useSearchParams } from "react-router-dom";
function Blog() {
  /// search
  let [search, setSearch] = useSearchParams({ page: 1, limit: 10, blog_id: null});
  ///  blogs
  let [allBlogs, setAllBlogs] = useState([]);
  /// get all blogs
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_all_blogs
      }`,
      {
        mode: "cors",
        method: "get",
        credentials: "include",
        headers: {
          Authorization: `GreenBearer ${
            import.meta.env.VITE_authorization_token
          }`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data.data);
      });
  }, []);
  /// more Blogs
  function moreBlogs() {
    let page = JSON.parse(search.get("page"));
    let limit = JSON.parse(search.get("limit"));

    setSearch({ page: page++, limit, blog_id: "" });
  }
  /// rendering
  if (allBlogs.length == 0) {
    return <LoadingSpinner color={"green-600"} />;
  }
  return (
    <div className="grid grid-rows gap-2 justify-center items-center">
      <div className="h-fit min-h-screen bg-white p-4 grid grid-cols-3 gap-10 w-full items-center justify-center">
        {allBlogs.map((blog, index) => {
          return (
            <Link
              to={`/blogs/${blog.blog_id}`}
              key={index}
              className="w-full h-fit p-2 text-green-700 cursor-pointer border-2 border-zinc-200 rounded-md shadow-md shadow-green-500 flex flex-col gap-4 bg-white hover:contrast-150 transition duration-300"
            >
              <div>
                <img
                  src={blog.CoverImage}
                  alt={blog.title}
                  className="w-full rounded-md"
                />
              </div>
              <div>
                <h2>{blog.title}</h2>
              </div>
              <div>
                <p>{blog.body.substring(0, 200) + "... "}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {/* more blogs */}
      <button
        className="w-full bg-zinc-100 flex items-center justify-center p-4 hover:bg-zinc-200 transition ease-on-out duration-300"
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
