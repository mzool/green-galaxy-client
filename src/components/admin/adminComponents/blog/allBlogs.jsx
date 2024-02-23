import { useState, useEffect } from "react";
import LoadingSpinner from "../../../../assets/loading";
import EditBlog from "./editBlog";

function AllBlogs() {
  const [toDo, setToDo] = useState(false);
  const [loading, isLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blog_id, setBlogId] = useState("");
  const [deletedBlog, setDeletedBlog] = useState("");
  /// get all blogs
  useEffect(() => {
    isLoading(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_all_blogs_admin
      }`,
      {
        mode: "cors",
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.allBlogs);
      })
      .finally(() => {
        isLoading(false);
      });
  }, []);
  /// handle delete blog rendering
  useEffect(() => {
    if (deletedBlog) {
      setBlogs(
        blogs.filter((blog) => {
          return blog.blog_id !== deletedBlog;
        })
      );
      setDeletedBlog("");
    }
  }, [deletedBlog]);
  //// rendering
  if (loading) {
    return <LoadingSpinner color={"green-600"} />;
  }
  if (toDo) {
    return (
      <EditBlog
        setToDo={setToDo}
        blog_id={blog_id}
        setDeletedBlog={setDeletedBlog}
      />
    );
  }
  if (blogs.length == 0 && !toDo){
    return <div>no blogs to show</div>
  }
    if (blogs.length > 0 && !toDo) {
      return (
        <div className="flex flex-col">
          <h2 className="bg-green-600 text-white rounded-md p-2 w-full font-bold">
            all blogs: <p className="text-xs">*click on to edit</p>
          </h2>
          {blogs.map((blog, index) => {
            return (
              <button
                key={index}
                className={`flex flex-row gap-2 p-2 ${
                  index % 2 == 0
                    ? "bg-gray-100 text-gray-700 hover:text-green-700"
                    : "bg-gray-700 text-white hover:text-green-100"
                }`}
                onClick={() => {
                  setToDo(true);
                  setBlogId(blog.blog_id);
                }}
              >
                {/* index */}
                <p>{index + 1}</p>
                {/* blog id */}
                <p>{blog.blog_id}</p>
                {/* title */}
                <p>{blog.title}</p>
              </button>
            );
          })}
        </div>
      );
    }
}

export default AllBlogs;
