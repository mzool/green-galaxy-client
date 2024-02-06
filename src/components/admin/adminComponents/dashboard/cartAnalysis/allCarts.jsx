import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import getRandomColor from "../sales/util/generateRandomColor.js";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "All Carts",
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: "cart",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Items in the cart", // Y-axis label
      },
    },
  },
//  onclick:(event, element)=>(event, element)=>{}
};

function AllCarts({ data }) {
  const [dataSet, setData] = useState({
    labels: [],
    datasets: [{}],
  });
  /// prepear data
  useEffect(() => {
    /// labels labels will be carts ids
    const labels = data.map((cart) => {
      return cart.cart_id;
    });
    /// get number of products in each cart
    let values = [];
    for (const cart of data) {
      let n = 0;
      for (const item of cart.items) {
        n++;
      }
      values.push(n);
    }
    /// generate colors
    let colors = [];
    for (let i = 0; i < labels.length; i++) {
      colors.push(getRandomColor());
    }
    /// set the data
    setData((pr) => ({
      ...pr,
      labels,
      datasets: [
        {
          label: "cart",
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
          hoverBackgroundColor: "rgba(0,0,0,0.4)",
          hoverBorderColor: "rgba(75,192,192,1)",
          data: values,
          barThickness: colors.length > 50 ? 10 : 25,
        },
      ],
    }));
  }, [data]);

  /// rendering
  return (
    <div>
      <Bar options={options} data={dataSet} className="w-[750px]" />
    </div>
  );
}

export default AllCarts;
