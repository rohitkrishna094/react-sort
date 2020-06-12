import React, { createContext, useReducer } from "react";
import { CHANGE_SIZE, RANDOMIZE, TOGGLE_PLAY, SWAP_INDEX, COMPARE_INDEX, CHANGE_ALGORITHM, CHANGE_DELAY } from "../../actionTypes/actionTypes";
import { generateCompareColors, generateArray, generateDefaultColors, generateSwapColors } from "../../../utils/utils";

const defaultSize = 100;
const initialState = {
  size: defaultSize,
  arr: generateArray(defaultSize),
  playing: false,
  colors: generateDefaultColors(defaultSize),
  sortingAlgorithm: 0,
  delay: 0,
};
const GlobalStateContext = createContext(initialState);
const { Provider } = GlobalStateContext;

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case CHANGE_SIZE:
        return { ...state, size: action.payload.size, arr: generateArray(action.payload.size), colors: generateDefaultColors(action.payload.size) };
      case RANDOMIZE:
        return { ...state, arr: generateArray(state.size) };
      case TOGGLE_PLAY:
        return { ...state, playing: action.payload.playing };
      case COMPARE_INDEX:
        return { ...state, arr: action.payload.arr, colors: generateCompareColors(state.size, action.payload.indices) };
      case SWAP_INDEX:
        return { ...state, arr: action.payload.arr, colors: generateSwapColors(state.size, action.payload.indices) };
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
