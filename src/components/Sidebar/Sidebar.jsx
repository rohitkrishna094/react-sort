import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.scss";
import { GlobalStateContext } from "../../store/providers/GlobalStateProvider/GlobalStateProvider";
import { CHANGE_SIZE, RANDOMIZE, TOGGLE_PLAY } from "../../store/actionTypes/actionTypes";
import { getDispatchList } from '../../algorithms/bubbleSort';
import { delay, cancellableDelay } from "../../utils/utils";
import { useInterval } from "../../hooks/useInterval";

const Sidebar = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { size, playing, arr } = state;
  const [dispatchList, setDispatchList] = useState([]);

  const onSliderChange = (e) => {
    dispatch({ type: CHANGE_SIZE, payload: { size: e.target.value } });
  };

  const onRandomizeClick = (e) => {
    dispatch({ type: RANDOMIZE });
  };

  useEffect(() => {
    setInterval(() => {
      console.log(dispatchList)
    }, 1000);
  }, [dispatchList]);

  

  const onPlayToggleClick = async (e) => {
    dispatch({ type: TOGGLE_PLAY, payload: { playing: !playing } });
    if (playing) {
      const tempArr = getDispatchList([...arr]);
      setDispatchList(tempArr);
      // setInterval(() => {
      //   console.log(dispatchList);
      //   // if (dispatchList && dispatchList.length > 0) {
      //   //   dispatch(dispatchList[0]);
      //   //   setDispatchList(setDispatchList(dispatchList.slice(1)));
      //   // }
      // }, 100);
      // // for (let i = 0; i < dispatchList.length; i++) {
      // //   await delayFunc.promise;
      // //   dispatch(dispatchList[i]);
      // // }
    }
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
          <select name="" id="" disabled={playing}>
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
