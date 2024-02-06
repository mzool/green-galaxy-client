import TotalSales from "./totalSales"
function MainSales({data, error, loading}) {
  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <TotalSales data={data} error={error} loading={loading} />
    </div>
  );
}

export default MainSales