import { useState } from "react";

function EditBlogForm({ blog_id, setToDo }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState({});
  /// handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    /// check if no image
    if (!title && !body && !image) {
      return setMsg("you did not edit anything");
    }
    let form_data = new FormData();
    image.name ? form_data.append("images", image) : null;
    title ? form_data.append("title", title) : null;
    body ? form_data.append("body", body) : null;
    form_data.append("blog_id", blog_id);
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_edit_blog_admin
      }`,
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        body: form_data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
      })
      .finally(() => {
        setBody("");
        setImage({});
        setTitle("");
        setLoading(false);
      });
  }
  /// rendering
  return (
    <div className="flex flex-col gap-4 p-2 rounded-md bg-gray-100 text-gray-700">
      <h2 className="w-full font-bold text-center">Edit Blog</h2>
      <form
        className="flex flex-col gap-2 p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="title"
          className="w-full border-gray-200 rounded p-2 border-2 hover:border-green-500 outline-0 focus:border-green-500"
        />
        {/* body */}
        <textarea
          name="body"
          id="blog-body"
          cols="100"
          rows="20"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={5000}
          placeholder="blog contents"
          className="p-4 rounded-md border-gray-200 border-2 hover:border-green-500 focus:border-green-500 outline-0 w-full h-fit"
        />
        {/* image */}
        <label htmlFor="main-image" className="text-green-700">
          Poster Image:
        </label>
        <input
          type="file"
          id="main-image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {msg && (
          <p className="text-gray-700 w-full p-2 bg-white rounded-md">{msg}</p>
        )}
        {/* submit */}
        <input
          type="submit"
          className={`p-2 ${
            loading
              ? "bg-gray-200 text-gray-700"
              : "bg-green-600 text-white hover:bg-green-800"
          } rounded-md px-6 py-2 place-self-center`}
          value={loading ? "editing..." : "edit"}
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default EditBlogForm;
