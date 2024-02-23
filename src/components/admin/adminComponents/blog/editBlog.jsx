import DeleteBlog from "./deleteBlog";
import EditBlogForm from "./editBlogForm";

function EditBlog({ setToDo, blog_id, setDeletedBlog }) {
  return (
    <div className="flex flex-col gap-6 p-4 text-gray-700 bg-white">
      <button
        className="rounded-md px-2 py-1 bg-gray-700 text-white w-fit"
        onClick={() => setToDo("")}
      >
        back to all blogs
      </button>
      <p className="font-bold">blog id: {blog_id}</p>
      {/* edit blog */}
      <EditBlogForm blog_id={blog_id} setToDo={setToDo}/>
      {/* delete blog */}
      <DeleteBlog setToDo={setToDo} setDeletedBlog={setDeletedBlog} id={blog_id}/>
    </div>
  );
}

export default EditBlog;
