import React, { useContext, useState, useEffect, useRef } from "react";
import "./Sidebar.scss";
import { GlobalStateContext } from "../../store/providers/GlobalStateProvider/GlobalStateProvider";
import { CHANGE_SIZE, RANDOMIZE, TOGGLE_PLAY, CHANGE_ALGORITHM, CHANGE_DELAY } from "../../store/actionTypes/actionTypes";
import { getAlgorithm, BUBBLE_SORT, INSERTION_SORT, MERGE_SORT, QUICK_SORT, HEAP_SORT } from '../../algorithms/index';

const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { size, playing, arr, sortingAlgorithm, delay } = state;
  const [dispatchList, setDispatchList] = useState([]);
  const dispatchListRef = useRef(dispatchList);
  dispatchListRef.current = dispatchList;
  const [timerId, setTimerId] = useState(0);

  const onSizeSliderChange = (e) => {
    dispatch({ type: CHANGE_SIZE, payload: { size: e.target.value } });
  };

  const onDelaySliderChange = e => {
    dispatch({ type: CHANGE_DELAY, payload: { delay: e.target.value } });
  };

  const onRandomizeClick = (e) => {
    dispatch({ type: RANDOMIZE });
  };

  // console.log(delay);
  // console.log(dispatchList.length, dispatchList);
  useEffect(() => {
    if (playing) {
      const sortFunction = getAlgorithm(sortingAlgorithm).algorithm;
      if (sortFunction) {
        setDispatchList(sortFunction([...arr]));
        const curTimerId = setInterval(() => {
          const dispatchListRefCurrent = dispatchListRef.current;
          if (dispatchListRefCurrent && dispatchListRefCurrent.length > 0) {
            dispatch(dispatchListRefCurrent[0]);
            setDispatchList(dispatchListRefCurrent.slice(1));
          } else if (dispatchListRefCurrent && dispatchListRefCurrent.length === 0) {
            dispatch({ type: TOGGLE_PLAY, payload: { playing: false } });
          }
        }, delay);
        setTimerId(curTimerId);
      }
    } else if (!playing) {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    }
  }, [playing, delay])

  const onSelectChange = e => {
    dispatch({ type: CHANGE_ALGORITHM, payload: { sortingAlgorithm: e.target.value } });
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
          <span className="slider_label">Size: {size}</span>
          <input className="slider slider_input" step="1" min="10" max="200" value={size} type="range" disabled={playing} onChange={onSizeSliderChange} />
        </div>
        <div className="slider">
          <span className="slider_label">Delay: {delay}</span>
          <input className="slider slider_input" step="1" min="0" max="500" value={delay} type="range" onChange={onDelaySliderChange} />
        </div>
        <div className="select" id="select_div">
          <select name="" id="" disabled={playing} onChange={onSelectChange}>
            <option value={BUBBLE_SORT}>Bubble Sort</option>
            <option value={INSERTION_SORT}>Insertion Sort</option>
            <option value={INSERTION_SORT}>Selection Sort</option>
            <option value={MERGE_SORT}>Merge Sort</option>
            <option value={QUICK_SORT}>Quick Sort</option>
            <option value={HEAP_SORT}>Heap Sort</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
