import { COMPARE_INDEX, SWAP_INDEX, SWEEP } from "../store/actionTypes/actionTypes";

// bubbleSort
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
  sweep(arr, dispatchList);
  return dispatchList;
};

// insertionSort
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
  sweep(arr, dispatchList);
  return dispatchList;
};

// selectionSort
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
  sweep(arr, dispatchList);
  return dispatchList;
};

// mergeSort
export const mergeSort = (arr) => {
  const _merge = (arr, start, mid, end) => {
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
  };

  const _mergeSort = (arr, start, end) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      _mergeSort(arr, start, mid);
      _mergeSort(arr, mid + 1, end);
      _merge(arr, start, mid, end);
    }
  };

  const dispatchList = [];
  _mergeSort(arr, 0, arr.length - 1);
  sweep(arr, dispatchList);
  return dispatchList;
};

// quickSort
export const quickSort = (arr) => {
  const _partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1; // index of smaller element
    for (let j = low; j < high; j++) {
      dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...arr], indices: [j, high] } });
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
        dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [i, j] } });
      }
    }
    swap(arr, i + 1, high);
    dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [i + 1, high] } });
    return i + 1;
  };

  const _quickSort = (arr, low, high) => {
    if (low < high) {
      const pi = _partition(arr, low, high);
      _quickSort(arr, low, pi - 1);
      _quickSort(arr, pi + 1, high);
    }
  };

  const dispatchList = [];
  _quickSort(arr, 0, arr.length - 1);
  sweep(arr, dispatchList);
  return dispatchList;
};

// heapSort
export const heapSort = (arr) => {
  const _buildMaxHeap = (arr) => {
    let i = Math.floor(arr.length / 2 - 1);

    // Build a max heap out of
    // all array elements passed in.
    while (i >= 0) {
      _heapify(arr, i, arr.length);
      i -= 1;
    }
  };

  const _heapify = (heap, i, max) => {
    let index, leftChild, righChild;

    while (i < max) {
      index = i;
      leftChild = 2 * i + 1;
      righChild = leftChild + 1;
      dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...heap], indices: [leftChild, index] } });
      if (leftChild < max && heap[leftChild] > heap[index]) {
        index = leftChild;
      }
      dispatchList.push({ type: COMPARE_INDEX, payload: { arr: [...heap], indices: [righChild, index] } });
      if (righChild < max && heap[righChild] > heap[index]) {
        index = righChild;
      }
      if (index === i) {
        return;
      }
      swap(heap, i, index);
      dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...heap], indices: [i, index] } });
      i = index;
    }
  };

  // start here
  const dispatchList = [];
  // Build our max heap.
  _buildMaxHeap(arr);

  // Find last element.
  let lastElement = arr.length - 1;

  // Continue heap sorting until we have
  // just one element left in the array.
  while (lastElement > 0) {
    swap(arr, 0, lastElement);
    dispatchList.push({ type: SWAP_INDEX, payload: { arr: [...arr], indices: [0, lastElement] } });
    _heapify(arr, 0, lastElement);
    lastElement -= 1;
  }
  sweep(arr, dispatchList);
  return dispatchList;
};

const sweep = (arr, dispatchList) => {
  for (let i = 0; i < arr.length; i++) dispatchList.push({ type: SWEEP, payload: { index: i } });
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
