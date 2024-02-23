import { useState } from "react";

function AddBlog() {
  let [blog, setBlog] = useState({
    title: "",
    body: "",
  });
  let [image, setImage] = useState();
  /// msg
  let [msg, setMsg] = useState({
    err: "",
    msg: "",
  });
  let [fetching, setFetching] = useState(false);
  /// submit
  function addBlog(e) {
    e.preventDefault();
    setFetching(true);
    /// check if no image
    if (!image || !blog.title || !blog.body) {
      setFetching(false);
      return setMsg({ err: "fill all fields" });
    }
    let form_data = new FormData();
    form_data.append("images", image);
    form_data.append("title", blog.title);
    form_data.append("body", blog.body);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_add_blog
      }`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: form_data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return setMsg({ err: data.error, msg: "" });
        } else {
          return setMsg({ msg: data.message, err: "" });
        }
      });
    setFetching(false);
    setBlog({});
    setImage({});
  }
  return (
    <div className="w-full h-fit flex justify-center items-center">
      <form
        onSubmit={addBlog}
        className="w-4/6 bg-gray-50 border-2 border-gray-400 rounded-md p-4 gap-4 flex flex-col justify-center items-center"
      >
        {/* title */}
        <div className="w-full">
          <input
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            type="text"
            placeholder="title"
            className="w-full border-gray-200 rounded p-2 border-2 hover:border-green-500 outline-0 focus:border-green-500"
          />
        </div>
        <div>
          {/* body */}
          <textarea
            name="body"
            id="blog-body"
            cols="100"
            rows="20"
            value={blog.body}
            onChange={(e) => setBlog({ ...blog, body: e.target.value })}
            maxLength={5000}
            placeholder="blog contents"
            className="p-4 rounded border-gray-200 border-2 hover:border-green-500 focus:border-green-500 outline-0 w-full h-fit"
          ></textarea>
        </div>
        {/* image */}
        <div className="w-full p-2 flex flex-col gap-2">
          <label htmlFor="main-image" className="text-green-700">
            Poster Image:
          </label>
          <input
            type="file"
            id="main-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {/* messages */}
        <div>
          <div className="bg-gray-50 p-4 rounded-md w-fit h-fit">
            {msg.err && <p className="text-red-500">{msg.err}</p>}
            {msg.msg && <p className="text-green-500">{msg.msg}</p>}
          </div>
          {/* submit */}
          <div className="w-full flex justify-center items-center mt-4">
            <input
              type="submit"
              className="p-2 bg-green-700 rounded text-white hover:bg-green-600"
              value={fetching ? "posting..." : "add new blog"}
              disabled={fetching}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
