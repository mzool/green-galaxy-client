import { useState } from "react";

function DeleteBlog({ setToDo, setDeletedBlog, id }) {
  const [blog_id, setBlogId] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  /// handle form submit
  function deleteBlog(e) {
    e.preventDefault();
    if(blog_id !== id){
      return setMsg("wrong blog id")
    }
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_delete_blog_admin
      }/${blog_id}`,
      {
        mode: "cors",
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setToDo("");
          setDeletedBlog(blog_id);
        } else {
          setMsg(data.message);
          setLoading(false);
        }
      });
  }
  /// rendering
  return (
    <form
      className="flex flex-col gap-4 rounded-md bg-red-100 text-gray-700 p-4 w-full"
      onSubmit={(e) => deleteBlog(e)}
    >
      <h2 className="w-full text-center font-bold">Delete Blog</h2>
      <label className="" htmlFor="blog_id">
        Enter the blog id:
      </label>
      <input
        type="text"
        id="blog_id"
        required
        className="px-2 py-1 rounded-md hover:border-green-600 focus:border-green-600 border border-gray-300 outline-0"
        onChange={(e) => setBlogId(e.target.value)}
        value={blog_id}
      />
      <input
        type="submit"
        value="delete blog"
        className={`rounded-md px-4 py-1 ${
          loading
            ? "bg-gray-100 text-gray-700"
            : "bg-red-600 hover:bg-red-500 text-white"
        } w-fit place-self-center`}
        disabled={loading}
      />
      {loading && (
        <div className="rounded-full h-6 w-6 animate-spin border-t-2 border-b-2 border-green-600 place-self-center" />
      )}
      {msg && (
        <p className="p-2 bg-white w-full rounded-md text-gray-700">{msg}</p>
      )}
    </form>
  );
}

export default DeleteBlog;
