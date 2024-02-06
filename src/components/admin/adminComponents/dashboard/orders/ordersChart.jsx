import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import { useState, useEffect } from "react";
import LoadingSpinner from "../../../../../assets/loading";
import getRandomColor from "../sales/util/generateRandomColor.js";

function OrdersChart({ data, error, loading }) {
  const [finalData, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "orders status",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  /// prepearing data
  useEffect(() => {
    /// labels
    let allOrders = [];
    let orders = {};
    data.map((order) => {
      if (!allOrders.includes(order.order_status)) {
        allOrders.push(order.order_status);
      }
      orders[order.order_status]
        ? orders[order.order_status]++
        : (orders[order.order_status] = 1);
    });
    let values = [];
    for (const value in orders) {
      values.push(orders[value]);
    }
    /// random colors array
    let colors = allOrders.map((orderStatus) => {
      let color;
      switch (orderStatus) {
        case "Cancelled":
          color = "rgb(255, 0, 0)";
          break;
        case "Completed":
          color = "rgb(0, 255, 0)";
          break;
        case "Pending":
         color = "rgb(255, 255, 0)";
          break;
        case "Processing":
         color = getRandomColor();
          break;
      }
      return color
    });
    /// update final data
    setData({
      labels: allOrders,
      datasets: [
        {
          label: "status",
          data: values,
          backgroundColor: colors,
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  //// rendering
  if (loading) {
    return <LoadingSpinner color={"green-600"} />;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div className="flex flex-col w-full p-4 items-center justify-center">
      <h2 className="w-full px-4 py-1 rounded-md text-white bg-gray-700 ">
        All Orders Status:
      </h2>
      <div className="max-w-lg">
        <Doughnut data={finalData} />
      </div>
    </div>
  );
}

export default OrdersChart;
