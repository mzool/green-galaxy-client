import AddBlog from "./addBlog";
import AllBlogs from "./allBlogs";
import GetAllComments from "./comments/getAllComments";
import { useState } from "react";

function MianBlogDashboard() {
  /// search
  const [search, setSearch] = useState("all-blogs");

  return (
    <div className="w-full h-fit min-h-screen p-4 flex flex-col gap-6 ">
      {/* controllers */}
      <div className="w-full h-fit flex flex-row gap-4 justify-center items-center">
        <button
          className="bg-gray-700 p-2 rounded-md text-white hover:bg-gray-500"
          onClick={() => {
            setSearch("add-blog");
          }}
        >
          add blog
        </button>
        <button
          className="bg-gray-700 p-2 rounded-md text-white hover:bg-gray-500"
          onClick={() => {
            setSearch("all-blogs");
          }}
        >
          all blogs
        </button>
        {/* comments */}
        {/* <button
          className="bg-gray-700 p-2 rounded-md text-white hover:bg-gray-500"
          onClick={() => {
            setSearch("all-comments");
          }}
        >
          comments
        </button> */}
      </div>
      {/* body */}
      <div className="w-full p-4 h-fit bg-white">
        {search == "all-blogs" && <AllBlogs />}
        {search == "add-blog" && <AddBlog />}
        {search == "all-comments" && <GetAllComments />}
      </div>
    </div>
  );
}

export default MianBlogDashboard;
