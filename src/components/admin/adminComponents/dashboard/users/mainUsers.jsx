import LoadingSpinner from "../../../../../assets/loading";
import UsersChart from "./usersChart";

function MainUsers({ data, error, loading }) {
  if (loading) {
    return <LoadingSpinner color={"green-600"} />;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {/* user with more than one purchased */}
      <h2 className="text-white bg-gray-700 p-1 w-full rounded-md">
        Users with more than one purchase:
      </h2>
      <div className="max-w-2xl place-self-center p-2 flex flex-col gap-4">
        <UsersChart data={data} />
      </div>
      <hr className="rounded-full border-2 border-gray-700" />
    </div>
  );
}

export default MainUsers;
