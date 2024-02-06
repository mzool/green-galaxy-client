import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import getRandomColor from "./util/generateRandomColor.js";

function CitiesChart({ data }) {
  const [pieChartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });
  useEffect(() => {
    //// labels
    const labels = data.filter((city, index, self) => {
      return self.indexOf(city) === index;
    });
    /// generate random colors
    let colors = [];
    for (let i = 0; i < labels.length; i++) {
      colors.push(getRandomColor());
    }
    /// get values of each city
    let citiesValues = {};
    for (const city of data) {
      citiesValues[city] ? citiesValues[city]++ : (citiesValues[city] = 1);
    }
    let finalValues = [];
    for (const city in citiesValues) {
      finalValues.push(citiesValues[city]);
    }
    /// chart data
    setChartData({
      labels: labels,
      datasets: [
        {
          data: finalValues,
          backgroundColor: colors,
        },
      ],
    });
  }, [data]);
  return <Pie data={pieChartData} />;
}

export default CitiesChart;
