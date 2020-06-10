import React, { useContext, useState, useEffect, useRef } from "react";
import "./Sidebar.scss";
import { GlobalStateContext } from "../../store/providers/GlobalStateProvider/GlobalStateProvider";
import { CHANGE_SIZE, RANDOMIZE, TOGGLE_PLAY, CHANGE_ALGORITHM } from "../../store/actionTypes/actionTypes";
import { getAlgorithm } from '../../algorithms/index';


const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { size, playing, arr, sortingAlgorithm } = state;
  const [dispatchList, setDispatchList] = useState([]);
  const dispatchListRef = useRef(dispatchList);
  dispatchListRef.current = dispatchList;
  const [timerId, setTimerId] = useState(0);

  const onSliderChange = (e) => {
    dispatch({ type: CHANGE_SIZE, payload: { size: e.target.value } });
  };

  const onRandomizeClick = (e) => {
    dispatch({ type: RANDOMIZE });
  };

  const delay = 0;
  useEffect(() => {
    if (playing) {
      console.log('inside useEffect');
      const sortFunction = getAlgorithm(sortingAlgorithm)?.algorithm;
      console.log('after getting sortFunction', sortFunction);
      if (sortFunction) {
        console.log('before calling insertion Sort');
        setDispatchList(sortFunction([...arr]));
        const curTimerId = setInterval(() => {
          const dispatchListRefCurrent = dispatchListRef.current;
          if (dispatchListRefCurrent && dispatchListRefCurrent.length > 0) {
            dispatch(dispatchListRefCurrent[0]);
            setDispatchList(dispatchListRefCurrent.slice(1));
          }
        }, delay);
        setTimerId(curTimerId);
      }
    } else if (!playing) {
      clearInterval(timerId);
    }
  }, [playing])

  const onSelectChange = e => {
    dispatch({ type: CHANGE_ALGORITHM, payload: { sortingAlgorithm: Number(e.target.value) } });
  }

  const onPlayToggleClick = async (e) => {
    dispatch({ type: TOGGLE_PLAY, payload: { playing: !playing } });
  };

  return (
    <div className="sidebar_container">
      <div className="sidebar">
        <button className="button is-primary" id="play_button" onClick={onPlayToggleClick}>
          <span className="icon">{playing ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}</span>
          <span className="button_title">{playing ? "Pause" : "Play"}</span>
        </button>
        <button className="button is-primary" id="randomize_button" disabled={playing} onClick={onRandomizeClick}>
          <span className="icon"><i className="fas fa-random" /></span>
          <span className="button_title">Randomize</span>
        </button>
        <div className="slider">
          <span id="slider_label">Size: {size}</span>
          <input id="slider_input" className="slider" step="1" min="10" max="200" value={size} type="range" disabled={playing} onChange={onSliderChange} />
        </div>
        <div className="select" id="select_div">
          <select name="" id="" disabled={playing} onChange={onSelectChange}>
            <option value="0">Bubble Sort</option>
            <option value="1">Insertion Sort</option>
            <option value="2">Selection Sort</option>
            <option value="3">Merge Sort</option>
            <option value="4">Quick Sort</option>
            <option value="5">Radix Sort</option>
            <option value="6">Heap Sort</option>{/* <option value="0">{getAlgorithm(0).name}</option>
            <option value="1">{getAlgorithm(1).name}</option>
            <option value="2">{getAlgorithm(2).name}</option>
            <option value="3">{getAlgorithm(3).name}</option>
            <option value="4">{getAlgorithm(4).name}</option>
            <option value="5">{getAlgorithm(5).name}</option>
            <option value="6">{getAlgorithm(6).name}</option> */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
