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

export const selectionSort = (arr) => {
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

export const mergeSort = (arr) => {
  const dispatchList = [];
  _mergeSort(arr, 0, arr.length - 1, dispatchList);
  console.log(arr);
  return dispatchList;
};

const _mergeSort = (arr, start, end, dispatchList) => {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    _mergeSort(arr, start, mid, dispatchList);
    _mergeSort(arr, mid + 1, end, dispatchList);
    _merge(arr, start, mid, end, dispatchList);
  }
};

export const _merge = (arr, start, mid, end, dispatchList) => {
  // create a temp array
  const temp = [];

  // crawlers for both intervals and for temp
  let i = start,
    j = mid + 1,
    k = 0;

  // traverse both arrays and in each iteration add smaller of both elements in temp
  while (i <= mid && j <= end) {
    dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...arr], indices: [i, j] } });
    if (arr[i] <= arr[j]) {
      dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [k, i] } });
      temp[k++] = arr[i++];
    } else {
      dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [k, j] } });
      temp[k++] = arr[j++];
    }
  }

  // add elements left in the first interval
  while (i <= mid) {
    dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [k, i] } });
    temp[k++] = arr[i++];
  }

  // add elements left in the second interval
  while (j <= end) {
    dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [k, j] } });
    temp[k++] = arr[j++];
  }

  // copy temp to original interval
  for (i = start; i <= end; i += 1) {
    arr[i] = temp[i - start];
    dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [i - start, i] } });
  }
  dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [0, 0] } });
};
