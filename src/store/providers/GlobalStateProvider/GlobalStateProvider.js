import React, { createContext, useReducer } from "react";
import { CHANGE_SIZE, RANDOMIZE } from "../../actionTypes/actionTypes";
import { generateArray } from "../../../utils/utils";

const defaultSize = 100;
const initialState = { size: defaultSize, arr: generateArray(defaultSize) };
const GlobalStateContext = createContext(initialState);
const { Provider } = GlobalStateContext;

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case CHANGE_SIZE:
        return { ...state, size: action.payload.size, arr: generateArray(action.payload.size) };
      case RANDOMIZE:
        return { ...state, arr: generateArray(state.size) };
      default:
        return state;
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { GlobalStateContext, GlobalStateProvider };
