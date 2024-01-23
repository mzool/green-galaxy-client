import EditRule from "./editRule";

function EditEmployeePage({ data, setChoosenAdmin }) {
  /// rendering
  return (
    <div className="min-h-screen bg-white p-10 flex flex-col gap-4 text-gray-700">
      <div className="p-2 bg-gray-200 rounded">
        <button className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-500"
        onClick={()=>setChoosenAdmin({})}
        >
          back
        </button>
      </div>
      {/* eidte rule */}
      <EditRule data={data} />
    </div>
  );
}

export default EditEmployeePage;
