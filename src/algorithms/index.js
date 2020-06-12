import { bubbleSort, insertionSort, selectionSort, mergeSort, quickSort, heapSort } from "./sorters";

export const getAlgorithm = (sortingAlgorithm) => {
  switch (sortingAlgorithm) {
    case BUBBLE_SORT:
      return { name: "Bubble Sort", algorithm: bubbleSort };
    case INSERTION_SORT:
      return { name: "Insertion Sort", algorithm: insertionSort };
    case SELECTION_SORT:
      return { name: "Selection Sort", algorithm: selectionSort };
    case MERGE_SORT:
      return { name: "Merge Sort", algorithm: mergeSort };
    case QUICK_SORT:
      return { name: "Quick Sort", algorithm: quickSort };
    case HEAP_SORT:
      return { name: "Heap Sort", algorithm: heapSort };
    default:
      return { name: "Bubble Sort" };
  }
};

export const BUBBLE_SORT = "BUBBLE_SORT";
export const INSERTION_SORT = "INSERTION_SORT";
export const SELECTION_SORT = "SELECTION_SORT";
export const MERGE_SORT = "MERGE_SORT";
export const QUICK_SORT = "QUICK_SORT";
export const HEAP_SORT = "HEAP_SORT";
