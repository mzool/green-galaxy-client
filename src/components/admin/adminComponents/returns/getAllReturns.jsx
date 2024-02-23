import EditReturn from "./editReturn";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../../assets/loading";
function GetAllReturns({ setToDo }) {
  const [allReturns, setAllReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState({});
  /// get all returns from server
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${
        import.meta.env.VITE_get_returns
      }`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllReturns(data.allReturns);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  /// rendering
  if (loading) {
    return <LoadingSpinner color={"green-600"} />;
  }
  if (active.id) {
    return (
      <EditReturn
        setToDo={setToDo}
        data={active}
        setActive={setActive}
        setAllReturns={setAllReturns}
      />
    );
  }
  return (
    <div>
      {allReturns.length > 0 ? (
        allReturns.map((ret, index) => {
          return (
            <div
              key={index}
              className={`${
                index % 2 == 0
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-700 text-white"
              } w-full p-2 flex flex-row gap-4 cursor-pointer hover:text-green-600`}
              onClick={() => setActive(ret)}
            >
              {/* number */}
              <button>{index + 1}</button>
              {/* return id */}
              <p>{ret.id}</p>
              {/* user email */}
              <p>{ret.userEmail}</p>
              {/* date */}
              <p>{new Date(ret.dateOfInitiate).toLocaleDateString()}</p>
            </div>
          );
        })
      ) : (
        <p className="font-bold text-center w-full mt-10">no returns untill the moment</p>
      )}
    </div>
  );
}

export default GetAllReturns;
