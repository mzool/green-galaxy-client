import { useState } from "react";

function DeleteReturn({ _id, setActive }) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  function handleDelete(e) {
    e.preventDefault();
    setLoading(true);
    if (id !== _id) {
      setLoading(false);
      return setMsg("invalid id");
    } else {
      setMsg("");
    }
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_delete_return
      }/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
      }).finally(()=>{
        setActive({})
      })
  }
  /// rendering
  return (
    <form
      className="bg-red-100 text-gray-700 rounded-md p-4 w-full flex flex-col gap-2"
      onSubmit={(e) => handleDelete(e)}
    >
      <h2>Delete the Return</h2>
      <p>retrun id: {_id}</p>
      <label htmlFor="id">confirm return id:</label>
      <input
        type="text"
        id="id"
        required
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full px-4 py-2 rounded-md outline-0"
      />
      <input
        type="submit"
        value="delete"
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded-md place-self-center w-fit"
      />
      {msg && (
        <div className="p-2 rounded-md w-full bg-white text-gray-700 text-center">
          {msg}
        </div>
      )}
      {loading && (
        <div className="w-6 h-6 border-b-2 border-t-2 border-green-600 animate-spin place-self-center rounded-full m-2"></div>
      )}
    </form>
  );
}

export default DeleteReturn;
