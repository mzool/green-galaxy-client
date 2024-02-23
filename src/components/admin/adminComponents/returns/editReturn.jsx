import DeleteReturn from "./deleteReturn";

function EditReturn({ setActive, data, setToDo }) {
  /// rendering
  return (
    <div className="flex flex-col gap-4 p-2">
      <button
        className="bg-gray-700 text-white rounded-md w-fit px-4 py-2"
        onClick={() => setActive({})}
      >
        go back
      </button>
      {/* edit return */}
      <form className="w-full bg-gray-100 text-gray-700 rounded-md p-4"></form>
      {/* delete return */}
      <DeleteReturn setToDo={setToDo} _id={data.id} setActive={setActive} />
    </div>
  );
}

export default EditReturn;
