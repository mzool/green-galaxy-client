import AllCarts from "./allCarts"

function MainCart({ data, error, loading }) {
  /// rendering
  if (loading) {
    return <LoadingSpinner color={"green-600"} />;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return <div className="w-full p-4 text-gray-700 text-lg flex flex-col gap-4">
    {/* all carts */}
    <h2>All Carts:</h2>
    <AllCarts data={data}/>
  </div>;
}

export default MainCart;
