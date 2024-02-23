import { useState } from "react";

function SendBlogEmail() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [blog_id, setBlogId] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  /// post function
  function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    if (!title || !summary || !blog_id) {
      return;
    }
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_send_blog_email
      }`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, summary, blog_id }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
        setBlogId("");
        setSummary("");
        setTitle("");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  /// rendering
  return (
    <form
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-md text-gray-700"
      onSubmit={(e)=>sendEmail(e)}
    >
      {/* title */}
      <label htmlFor="title">Enter Blog Title:</label>
      <input
        id="title"
        type="text"
        className="px-4 py-2 rounded-md outline-0 border focus:border-green-600 hover:border-green-600"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* summary */}
      <label htmlFor="summary">Enter Blog Summary:</label>
      <input
        id="summary"
        type="text"
        className="px-4 py-2 rounded-md outline-0 border focus:border-green-600 hover:border-green-600"
        required
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      {/* blog_id */}
      <label htmlFor="blog_id">Enter Blog Blog Id:</label>
      <input
        id="blog_id"
        type="text"
        className="px-4 py-2 rounded-md outline-0 border focus:border-green-600 hover:border-green-600"
        required
        value={blog_id}
        onChange={(e) => setBlogId(e.target.value)}
      />
      {/* message */}
      {msg && (
        <div className="p-2 rounded-md bg-gray-700 text-white">{msg}</div>
      )}
      {/* submit */}
      <input
        type="submit"
        className="bg-gray-700 rounded-md text-white px-4 py-2"
        value={!loading ? "submit" : "..."}
        disabled={loading}
      />
    </form>
  );
}

export default SendBlogEmail;
