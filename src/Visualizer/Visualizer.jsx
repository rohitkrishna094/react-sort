import React, { useContext } from "react";
import "./Visualizer.scss";
import { Bar } from "react-chartjs-2";
import { GlobalStateContext } from "../store/providers/GlobalStateProvider/GlobalStateProvider";

const Visualizer = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { arr } = state;
  console.log(state);

  const data = {
    labels: Array(arr.length).map((x) => x),
    datasets: [
      {
        backgroundColor: "rgba(237, 37, 78, 0.9)",
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: arr,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    animation: {
      duration: 0,
      easing: "linear",
      rotate: true,
      scale: false,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [{ display: false }],
    },
  };
  return (
    <div className="visualizer_container">
      <div className="visualizer">
        <Bar data={data} width={100} height={50} options={options} />
      </div>
    </div>
  );
};

export default Visualizer;
