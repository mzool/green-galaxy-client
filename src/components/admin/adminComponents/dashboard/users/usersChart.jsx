import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import getRandomColor from "../sales/util/generateRandomColor.js";

function UsersChart({ data }) {
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
    let users = {};
    for (const userEmail of data) {
      users[userEmail] ? users[userEmail]++ : (users[userEmail] = 1);
    }
    let labels = [];
    for (const user in users) {
      if (users[user] > 1) {
        labels.push(user);
      }
    }
    /// generate random colors
    let colors = [];
    for (let i = 0; i < labels.length; i++) {
      colors.push(getRandomColor());
    }
    /// get values of each email
    let finalValues = [];
    for (const email of labels) {
      finalValues.push(users[email]);
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

export default UsersChart;
