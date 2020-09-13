import React, { createContext, useReducer } from "react";
import { CHANGE_SIZE, RANDOMIZE, TOGGLE_PLAY, SWAP_INDEX, COMPARE_INDEX, CHANGE_ALGORITHM, CHANGE_DELAY, SWEEP } from "../../actionTypes/actionTypes";
import { generateCompareColors, generateArray, generateDefaultColors, generateSwapColors, generateSweepColors, getCompareFreq, getSweepFreq } from "../../../utils/utils";
import { BUBBLE_SORT } from "../../../algorithms";

const defaultSize = 100;
const initialState = {
  size: defaultSize,
  arr: generateArray(defaultSize),
  playing: false,
  colors: generateDefaultColors(defaultSize),
  sortingAlgorithm: BUBBLE_SORT,
  delay: 10,
  freq: 110,
};
const GlobalStateContext = createContext(initialState);
const { Provider } = GlobalStateContext;

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case CHANGE_SIZE:
        return { ...state, size: action.payload.size, arr: generateArray(action.payload.size), colors: generateDefaultColors(action.payload.size) };
      case RANDOMIZE:
        return { ...state, arr: generateArray(state.size), colors: generateDefaultColors(state.size) };
      case TOGGLE_PLAY:
        return { ...state, playing: action.payload.playing };
      case COMPARE_INDEX:
        return { ...state, arr: action.payload.arr, colors: generateCompareColors(state.size, action.payload.indices), freq: getCompareFreq(state.arr, action.payload.indices) };
      case SWAP_INDEX:
        return { ...state, arr: action.payload.arr, colors: generateSwapColors(state.size, action.payload.indices) };
      case SWEEP:
        return { ...state, colors: generateSweepColors(state.size, action.payload.index), freq: getSweepFreq(state.arr, action.payload.index) };
      case CHANGE_ALGORITHM:
        return { ...state, sortingAlgorithm: action.payload.sortingAlgorithm };
      case CHANGE_DELAY:
        return { ...state, delay: action.payload.delay };
      default:
        return state;
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { GlobalStateContext, GlobalStateProvider };
