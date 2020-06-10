import { bubbleSort, insertionSort, selectionSort } from "./sorters";

export const getAlgorithm = (id) => {
  switch (id) {
    case 0:
      return { name: "Bubble Sort", algorithm: bubbleSort };
    case 1:
      return { name: "Insertion Sort", algorithm: insertionSort };
    case 2:
      return { name: "Selection Sort", algorithm: selectionSort };
    case 3:
      return { name: "Merge Sort" };
    case 4:
      return { name: "Quick Sort" };
    case 5:
      return { name: "Radix Sort" };
    case 6:
      return { name: "Heap Sort" };
    default:
      return { name: "Bubble Sort" };
  }
};
