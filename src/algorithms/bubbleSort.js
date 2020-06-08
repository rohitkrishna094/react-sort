import { COMPARE_INDEX, SWAP_INDEX } from "../store/actionTypes/actionTypes";
import { swap } from "../utils/utils";

export const getDispatchList = (arr) => {
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
  return dispatchList;
};
