import React, { useContext } from "react";
import "./Sidebar.scss";
import { GlobalStateContext } from "../store/providers/GlobalStateProvider/GlobalStateProvider";
import { CHANGE_SIZE, RANDOMIZE } from "../store/actionTypes/actionTypes";

const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { size } = state;

  const onSliderChange = e => {
    dispatch({ type: CHANGE_SIZE, payload: { size: e.target.value } })
  }

  const onRandomizeClick = e => {
    dispatch({ type: RANDOMIZE });
  }

  return (
    <div className="sidebar_container">
      <div className="sidebar">
        <button className="button is-primary" id="play_button">
          <i className="fas fa-play"></i>
          <span className="button_title">Play</span>
        </button>
        <button className="button is-primary" id="randomize_button" onClick={onRandomizeClick}>
          Randomize
        </button>
        <div className="slider">
          <span id="slider_label">Size:  {size}</span>
          <input id="slider_input" className="slider" step="1" min="10" max="200" value={size} type="range" onChange={onSliderChange} />
        </div>
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
