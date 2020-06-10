import { COMPARE_INDEX, SWAP_INDEX } from "../store/actionTypes/actionTypes";
import { swap } from "../utils/utils";

export const bubbleSort = (arr) => {
  const dispatchList = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...arr], indices: [j, j + 1] } });
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [j, j + 1] } });
      }
    }
  }
  return dispatchList;
};

export const insertionSort = (arr) => {
  const dispatchList = [];
  let i = 1;
  while (i < arr.length) {
    let x = arr[i];
    let j = i - 1;
    dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...arr], indices: [j, i] } });
    while (j >= 0 && arr[j] > x) {
      arr[j + 1] = arr[j];
      dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [j, j + 1] } });
      j--;
    }
    arr[j + 1] = x;
    dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [j + 1, i] } });
    i++;
  }
  return dispatchList;
};

export const selectionSort = function (arr) {
  const dispatchList = [];
  let minIdx;
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    minIdx = i;
    for (let j = i + 1; j < len; j++) {
      dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...arr], indices: [j, minIdx] } });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    swap(arr, i, minIdx);
    dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [i, minIdx] } });
  }
  return dispatchList;
};

