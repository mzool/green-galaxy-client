import { useState } from "react";

function SendDiscountEmail() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  /// post function
  function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    if (!title || !body) {
      return;
    }
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_send_discount_email
      }`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
        setBody("");
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
      onSubmit={(e) => sendEmail(e)}
    >
      {/* title */}
      <label htmlFor="title">Enter a Title:</label>
      <input
        id="title"
        type="text"
        className="px-4 py-2 rounded-md outline-0 border focus:border-green-600 hover:border-green-600"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* body */}
      <label htmlFor="body">Enter the body:</label>
      <input
        id="body"
        type="text"
        className="px-4 py-2 rounded-md outline-0 border focus:border-green-600 hover:border-green-600"
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
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

export default SendDiscountEmail;
