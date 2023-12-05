import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../assets/loading";
import Comments from "./comments/comments";
function GetBlog() {
  const {blogId} = useParams();
  /// blog information
  let [blog, setBlog] = useState({
    title: "",
    body: "",
    imageURL: "",
    comments: [],
  });
  /// fetching
  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_get_one_blog
        }`,
        {
          method: "get",
          mode: "cors",
          headers: {
            blog_id: blogId,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("failed to get blogs");
          }
        })
        .then((data) => {
          if (data) {
            setBlog({
              title: data.data.title,
              body: data.data.body,
              imageURL: data.data.coverImage,
              comments: data.data.comments,
            });
          }
        });
    } catch (err) {
      console.log("something went error");
    }
  }, [blogId]);
  if (!blog.title) {
    return <LoadingSpinner color={"green-500"} />;
  }
  return (
    <div className="h-fit min-h-screen w-full p-4 bg-white w-full flex flex-col gap-4  text-green-700 text-start">
      {/* image */}
      <div className="w-full h-96 ">
        <img
          src={blog.imageURL}
          alt={blog.title}
          className="w-full h-full rounded-lg"
        />
      </div>
      {/* title */}
      <div className="flex w-full text-center">
        <h1 className="text-2xl w-full">{blog.title}</h1>
      </div>
      {/* body */}
      <div className="w-full flex items-center justify-center">
        {<p className="w-4/6">{blog.body}</p>}
      </div>
      {/* comments */}
      <Comments/>
    </div>
  );
}

export default GetBlog;
