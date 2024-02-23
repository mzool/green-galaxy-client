import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../assets/loading";
import Comments from "./comments/comments";
import TagsForSEO from "../utilities/reactHelmet";

function GetBlog() {
  const { blog_id } = useParams();
  /// blog information
  let [blog, setBlog] = useState({
    title: "",
    body: "",
    imageURL: "",
    comments: [],
  });
  /// fetching
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
          import.meta.env.VITE_get_one_blog
        }`,
        {
          method: "get",
          mode: "cors",
          headers: {
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
            console.log(data);
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
    <div className="h-fit min-h-screen w-full p-6 flex flex-col gap-4 bg-white text-gray-700 text-start">
      <TagsForSEO
        title={blog.title}
        pageURL={`https://green-galaxy.net/blogs/${blog_id}`}
        descriptionOfThePage={`${blog.title}`}
        urlToImageDescripeThePage={blog.imageURL}
      />
      {/* image */}
      <div className="md:w-3/6 sm:w-4/6 w-full place-self-center">
        <img
          src={blog.imageURL}
          alt={blog.title}
          className="object-cover rounded-md"
        />
      </div>
      {/* title */}
      <div className="md:w-3/6 sm:w-4/6 w-full place-self-center">
        <h1 className="text-2xl w-full font-bold">{blog.title}</h1>
      </div>
      {/* body */}
      <div className="md:w-3/6 sm:w-4/6 w-full place-self-center flex flex-col">
        {blog.body.split(".").map((p, ind) => {
          return (
            <div key={ind}>
              <p>{p + "."}</p>
            </div>
          );
        })}
      </div>
      {/* comments */}
      <Comments />
    </div>
  );
}

export default GetBlog;
