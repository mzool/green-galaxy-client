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
import getRandomColor from "./util/generateRandomColor.js";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Product sold at our store",
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: "product name",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Sold Items", // Y-axis label
      },
    },
  },
  // onClick: (event, elements) => handleBarClick(event, elements),
};
// function handleBarClick(event, elements){
//     console.log(event, elements);
// }

function ProductsChart({ data }) {
  const [dataSet, setData] = useState({
    labels: [],
    datasets: [{}],
  });
  /// prepear data
  useEffect(() => {
    /// labels labels will be products names
    let productsNames = [];
    let products = {};
    for (const items of data) {
      for (const item of items) {
        if (!productsNames.includes(item.product.productName)) {
          productsNames.push(item.product.productName);
        }
        products[item.product.productName]
          ? products[item.product.productName]++
          : (products[item.product.productName] = 1);
      }
    }
    let values = [];
    for (const value in products) {
      values.push(products[value]);
    }
    /// generate colors
    let colors = [];
    for (let i = 0; i < productsNames.length; i++) {
      colors.push(getRandomColor());
    }
    /// set the data
    setData((pr) => ({
      ...pr,
      labels: productsNames,
      datasets: [
        {
          label: "product",
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

export default ProductsChart;
