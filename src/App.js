import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Visualizer from "./components/Visualizer/Visualizer";
import { GlobalStateProvider } from "./store/providers/GlobalStateProvider/GlobalStateProvider";
import "./App.scss";
import "bulma/css/bulma.css";

function App() {
  return (
    <GlobalStateProvider>
      <div className="App">
        <Sidebar />
        <Visualizer />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
