import { useEffect, useContext } from "react";
import theStore from "../../store/store.js";
import { Link } from "react-router-dom";

function OurBlog() {
  const { store } = useContext(theStore);

  /// get all blogs
  useEffect(() => {
    if (store.blogs.length > 0) {
      return;
    }
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
  }, []);

  /// rendering
  return (
    <div className="flex flex-col gap-6 w-full h-fit text-gray-700 p-4">
      <h2 className="text-2xl w-full bg-green-50 p-2 rounded-md">
        Explore Our Blog
      </h2>
      {/* Blog Container */}
      <div className="flex flex-row flex-wrap gap-2 w-full items-center justify-center">
        {store.blogs?.slice(0, 2).map((blog, index) => (
          <Link
            to={`/blogs/${blog.blog_id}`}
            key={index}
            className={`sm:w-5/12 h-96 p-4 rounded-lg text-gray-600 grid sm:grid-rows-6
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
        ))}
      </div>
    </div>
  );
}

export default OurBlog;
