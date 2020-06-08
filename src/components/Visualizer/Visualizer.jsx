import React, { useContext } from "react";
import "./Visualizer.scss";
import { Bar } from "react-chartjs-2";
import { GlobalStateContext } from "../../store/providers/GlobalStateProvider/GlobalStateProvider";

const Visualizer = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { arr, colors } = state;

  const data = {
    labels: Array(arr.length).map((x) => x),
    datasets: [
      {
        backgroundColor: [...colors],
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [...arr], // need to clone arr since chartJs props are being passed to it
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Visualizer;
