import LoadingSpinner from "../../../../../assets/loading";
import CitiesChart from "./citiesChart";
import ProductsChart from "./productsChart";



function TotalSales({ loading, error, data }) {
  /// rendering
  if (loading) {
    return <LoadingSpinner color={"green-600"} />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="w-full p-4 flex flex-col gap-2 text-gray-700 text-xl">
      {/* total items sold */}
      <h2 className="bg-gray-700 p-2 rounded-md w-full text-white">
        Total Purchases: {data.getOrders.length}
      </h2>
      {/* cities */}
      <div className="w-full flex flex-col gap-4 place-self-center p-4 items-center justify-center">
        <h2>Geographical Distribution of Orders:</h2>
        <div className="max-w-96">
          <CitiesChart
            data={data.getOrders.map((d) => {
              return d.city;
            })}
          />
        </div>
      </div>
      <hr className="border-2 rounded-full border-gray-700" />
      {/* products */}
      <div className="w-full flex flex-col gap-4 place-self-center p-4 items-center justify-center">
        <h2>Products we sold:</h2>
        <div className="w-fit">
          <ProductsChart
            data={data.getOrders.map((d) => {
              return d.items;
            })}
          />
        </div>
      </div>
      <hr className="border-2 rounded-full border-gray-700" />
    </div>
  );
}

export default TotalSales;
