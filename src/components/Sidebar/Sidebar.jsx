import React, { useContext } from "react";
import "./Sidebar.scss";
import { GlobalStateContext } from "../../store/providers/GlobalStateProvider/GlobalStateProvider";
import { CHANGE_SIZE, RANDOMIZE, TOGGLE_PLAY } from "../../store/actionTypes/actionTypes";
import { getDispatchList } from '../../algorithms/bubbleSort';
import { delay } from "../../utils/utils";

const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { size, play, arr } = state;

  const onSliderChange = (e) => {
    dispatch({ type: CHANGE_SIZE, payload: { size: e.target.value } });
  };

  const onRandomizeClick = (e) => {
    dispatch({ type: RANDOMIZE });
  };

  const onPlayToggleClick = async (e) => {
    dispatch({ type: TOGGLE_PLAY, payload: { play: !play } });
    if (play) {
      const dispatchList = getDispatchList([...arr]);
      for (let i = 0; i < dispatchList.length; i++) {
        await delay(0);
        dispatch(dispatchList[i]);
      }
    }
  };

  return (
    <div className="sidebar_container">
      <div className="sidebar">
        <button className="button is-primary" id="play_button" onClick={onPlayToggleClick}>
          <span className="icon">{play ? <i className="fas fa-play" /> : <i className="fas fa-pause" />}</span>
          <span className="button_title">{play ? "Play" : "Pause"}</span>
        </button>
        <button className="button is-primary" id="randomize_button" disabled={!play} onClick={onRandomizeClick}>
          <span className="icon"><i className="fas fa-random" /></span>
          <span className="button_title">Randomize</span>
        </button>
        <div className="slider">
          <span id="slider_label">Size: {size}</span>
          <input id="slider_input" className="slider" step="1" min="10" max="200" value={size} type="range" disabled={!play} onChange={onSliderChange} />
        </div>
        <div className="select" id="select_div">
          <select name="" id="" disabled={!play}>
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
