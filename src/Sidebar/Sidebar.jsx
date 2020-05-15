import React from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar_container">
      <div className="sidebar">
        <button className="button is-primary" id="play_button">
          <i className="fas fa-play"></i>
          <span className="button_title">Play</span>
        </button>
        <button className="button is-primary" id="randomize_button">Randomize</button>
        <button className="button is-primary" id="array_size_button">Array Size</button>
        <div className="select" id="select_div">
          <select name="" id="">
            <option value="">Bubble Sort</option>
            <option value="">Insertion Sort</option>
            <option value="">Selection Sort</option>
            <option value="">Merge Sort</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
