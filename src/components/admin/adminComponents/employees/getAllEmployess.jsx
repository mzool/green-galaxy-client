import { useState, useEffect } from "react";
import getAllAdmins from "./functions/getAll.js";
import LoadingSpinner from "../../../../assets/loading.jsx";
import EditEmployeePage from "./EditEmployeePage.jsx";
function GetAllEmployess() {
  /// variables
  const [allAdmins, setAllAdmins] = useState([]);
  const [choosenAdmin, setChoosenAdmin] = useState({})
  /// fetch the server
  useEffect(() => {
    if (allAdmins.length == 0) {
      getAllAdmins()
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (data.success) {
            setAllAdmins(data.allAdmins);
          }
        });
    }
  }, []);
  /// rendering
  if(choosenAdmin._id){
    return <EditEmployeePage data={choosenAdmin} setChoosenAdmin={setChoosenAdmin}/>
  }
  return allAdmins.length == 0 ? (
    <LoadingSpinner color={"green-500"} />
  ) : (
    <div className="flex flex-col w-full h-fit min-h-screen p-6 text-gray-700 bg-white">
      {/* header */}
      <div className="flex flex-row gap-6 p-4 rounded-md bg-gray-500 text-white w-full">
        <h2>number</h2>
        <h2>id</h2>
        <h2>name</h2>
        <h2>email</h2>
        <h2>rule</h2>
        <h2>phone</h2>
      </div>
      <div className="flex flex-col ">
        {allAdmins.map((admin, index) => (
          <div
          onClick={()=>setChoosenAdmin(admin)}
            key={admin._id}
            className={`cursor-pointer ${
              index % 2 != 0
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
           w-full text-center p-4 flex flex-row gap-6 `}
          >
            <h2>{index + 1}</h2>
            <h2>{admin._id}</h2>
            <h2>{admin.username}</h2>
            <h2>{admin.email}</h2>
            <h2>{admin.isAdmin}</h2>
            <h2>{admin.phone}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetAllEmployess;
