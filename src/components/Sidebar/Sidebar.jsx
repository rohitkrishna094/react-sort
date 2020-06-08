import React, { useContext } from "react";
import "./Sidebar.scss";
import { GlobalStateContext } from "../../store/providers/GlobalStateProvider/GlobalStateProvider";
import { COMPARE_INDEX, SWAP_INDEX, CHANGE_SIZE, RANDOMIZE, TOGGLE_PLAY } from "../../store/actionTypes/actionTypes";
import { delay } from "../../utils/utils";

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const handleDispatch = async (dispatch, arr) => {
  const dispatchList = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...arr], indices: [j, j + 1] } });
      if (arr[j] > arr[j + 1]) {
        dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [j, j + 1] } });
        swap(arr, j, j + 1);
      }
    }
  }

  for (let i = 0; i < dispatchList.length; i++) {
    await delay(0);
    dispatch(dispatchList[i]);
  }
};

const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { size, play, arr } = state;

  const onSliderChange = (e) => {
    dispatch({ type: CHANGE_SIZE, payload: { size: e.target.value } });
  };

  const onRandomizeClick = (e) => {
    dispatch({ type: RANDOMIZE });
  };

  const onPlayToggleClick = (e) => {
    dispatch({ type: TOGGLE_PLAY, payload: { play: !play } });
    if (play) {
      handleDispatch(dispatch, [...arr]);
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
          <span className="icon"><i class="fas fa-random" /></span>
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
