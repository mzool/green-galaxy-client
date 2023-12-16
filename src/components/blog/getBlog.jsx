import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../assets/loading";
import Comments from "./comments/comments";
function GetBlog() {
  const {blog_id} = useParams();
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
            Authorization: `GreenBearer ${
              import.meta.env.VITE_authorization_token
            }`,
            blog_id: blog_id,
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
  }, [blog_id]);
  if (!blog.title) {
    return <LoadingSpinner color={"green-500"} />;
  }
  return (
    <div className="h-fit min-h-screen w-full px-4 bg-white w-full flex flex-col gap-4  text-gray-700 text-start">
      {/* image */}
      <div className="w-full h-96 p-4">
        <img
          src={blog.imageURL}
          alt={blog.title}
          className="w-full h-full rounded-lg"
        />
      </div>
      {/* title */}
      <div className="sm:px-10 w-full">
        <h1 className="text-2xl w-full font-bold">{blog.title}</h1>
      </div>
      {/* body */}
      <div className="sm:w-5/6 flex items-start flex-col sm:p-10">
        {blog.body.split(".").map((p, ind)=>{
          return (
            <div key={ind}>
              <p>{p +"."}</p>
            </div>
          );
        })}
      </div>
      {/* comments */}
      <Comments/>
    </div>
  );
}

export default GetBlog;
