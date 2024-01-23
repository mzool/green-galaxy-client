import editeAdminRuleHandler from "./functions/editAdminRule.js";
import { useState } from "react";
function EditRule({ data }) {
  /// new rule
  const [newRule, setNewRule] = useState("");
  /// fetching
  const [isFetching, setIsFetching] = useState(false);
  /// msg
  const [msg, setMsg] = useState("");
  /// handle form
  function handleForm(e) {
    e.preventDefault();
    setIsFetching(true);
    editeAdminRuleHandler(data._id, newRule)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return setMsg("some thing error");
        }
      })
      .then((data) => {
        if (data.success) {
          setMsg(data.message);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  }
  /// rendering
  return (
    <div className="bg-gray-100 p-4 rounded-md flex flex-col gap-6 text-center">
      <h2 className="font-bold">change admin rule</h2>
      <form
        className="flex flex-row gap-4 items-center justify-center flex-wrap"
        onSubmit={(e) => handleForm(e)}
      >
        {/* id */}
        <label htmlFor="id">id:</label>
        <input
          id="id"
          type="text"
          readOnly
          value={data._id}
          className="rounded-md px-4 py-2"
        />
        {/* current rule */}
        <label htmlFor="currentRule">current rule:</label>
        <input
          id="currentRule"
          type="text"
          readOnly
          value={data.isAdmin}
          className="rounded-md px-4 py-2"
        />
        {/* new rule */}
        <label htmlFor="newRule">new rule:</label>
        <select
          name="newRule"
          id="newRule"
          className="px-4 py-2 rounded"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
        >
          <option value="">choose new rule</option>
          <option value="superAdmin">super admin</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
        <input
          type="submit"
          disabled={isFetching}
          value={`${isFetching ? "wait a second..." : "apply change"}`}
          className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-800 "
        />
      </form>
      {msg && (
        <div className="bg-white p-2 rounded">
          <p>{msg}</p>
        </div>
      )}
    </div>
  );
}

export default EditRule;
