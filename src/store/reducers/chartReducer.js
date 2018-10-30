const length = 300;
const tempArray = Array.from({ length }, () => Math.random() * 40);
const initialState = { array: tempArray, length, currentIteration: 1, done: false, pause: false };

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_ITERATION':
      let newArray = [...action.payload.array];
      bubbleSort(newArray, action.payload.currentIteration);
      let status = false;
      if (isSorted(newArray)) {
        status = true;
      }
      return { ...state, array: newArray, currentIteration: state.currentIteration + 1, done: status };
    case 'PAUSE_ITERATION':
      return { ...state, pause: !state.pause };
    default:
      return state;
  }
};

const bubbleSort = (arr, iter) => {
  let count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (iter === count) return arr;
      count++;
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};

// const bubbleSort = (arr, n) => {
//   for (let x = 0; x < n; x++) {
//     arr.forEach((e, i) => {
//       if (arr[i + 1] < e) {
//         arr[i] = arr[i + 1];
//         arr[i + 1] = e;
//       }
//     });
//   }
//   return arr;
// };

const isSorted = arr => {
  let sorted = true;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      sorted = false;
      break;
    }
  }
  return sorted;
};

// const isArraysEqual = (a, b) => {
//   if (a === b) return true;
//   if (a == null || b == null) return false;
//   if (a.length !== b.length) return false;

//   // If you don't care about the order of the elements inside
//   // the array, you should sort both arrays here.
//   // Please note that calling sort on an array will modify that array.
//   // you might want to clone your array first.

//   for (var i = 0; i < a.length; ++i) {
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// };

// swap function helper
const swap = (array, i, j) => {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

export default chartReducer;

// const tempArray = [
//   1,
//   9,
//   16,
//   33,
//   34,
//   2,
//   0,
//   16,
//   14,
//   5,
//   39,
//   22,
//   38,
//   17,
//   32,
//   20,
//   33,
//   35,
//   18,
//   36,
//   13,
//   17,
//   39,
//   11,
//   2,
//   12,
//   19,
//   22,
//   17,
//   23,
//   25,
//   7,
//   23,
//   37,
//   0,
//   7,
//   11,
//   15,
//   21,
//   29
// ];
