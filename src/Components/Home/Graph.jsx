import React from "react";
import "chart.js/auto";

import { Line } from "react-chartjs-2";

const Graph = () => {
  const data = {
    labels: ["Jun", "Jul", "Aug"],
    datasets: [
      {
        id: 1,
        label: "type1",
        data: [5, 6, 7],
      },
      {
        id: 2,
        label: "type2",
        data: [3, 2, 1],
        color: "red",
      },
    ],
  };

  const data2 = [
    { x: 0, y: 4 },
    { x: 1, y: 2 },
    { x: 2, y: 14 },
    { x: 3, y: 4 },
    { x: 4, y: 12 },
    { x: 5, y: 6 },
    { x: 6, y: 8 },
    { x: 7, y: 2 },
    { x: 8, y: 9 },
    { x: 9, y: 9 },
  ];

  return (
    <div className="mt-5 graphdem">
      <Line data={data} />
    </div>
  );
};

export default Graph;
