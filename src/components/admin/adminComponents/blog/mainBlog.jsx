import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import AddBlog from "./addBlog"

function MianBlogDashboard() {
    /// search 
    const [search, setSearch] = useSearchParams({page:"blog", toDo:"all-blogs"});

  return (
    <div className="w-full h-fit min-h-screen p-4 flex flex-col gap-6 ">
      {/* controllers */}
      <div className="w-full h-fit flex flex-row gap-4 justify-center items-center">
        <button
          className="bg-green-800 p-2 rounded-md text-white hover:bg-green-700"
          onClick={() => {
            setSearch({ page: "blog", toDo: "add-blog" });
          }}
        >
          add blog
        </button>
        <button
          className="bg-green-800 p-2 rounded-md text-white hover:bg-green-700"
          onClick={() => {
            setSearch({ page: "blog", toDo: "all-blogs" });
          }}
        >
          all blogs
        </button>
      </div>
      {/* body */}
      <div className="w-full p-4 h-fit bg-white">
        {search.get("toDo") == "all-blogs" && <>all blogs</>}
        {search.get("toDo") == "add-blog" && <AddBlog/>}
      </div>
    </div>
  );
}

export default MianBlogDashboard