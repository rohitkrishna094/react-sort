import React from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import Visualizer from "./components/Visualizer/Visualizer";
import "bulma/css/bulma.css";
import { GlobalStateProvider } from "./store/providers/GlobalStateProvider/GlobalStateProvider";

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