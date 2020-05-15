import React from "react";
import "./App.scss";
import Sidebar from "./Sidebar/Sidebar";
import Visualizer from "./Visualizer/Visualizer";
import "bulma/css/bulma.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Visualizer />
    </div>
  );
}

export default App;
