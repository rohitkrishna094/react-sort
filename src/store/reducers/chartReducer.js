import { isSorted, bubbleSort, selectionSort, insertionSort, mergeSort } from "./sorters";

const length = 200;
const tempArray = Array.from({ length }, () => Math.random() * 40);
const initialState = {
    array: tempArray,
    currentIteration: 1,
    done: false,
    length: tempArray.length,
    pause: true,
    indices: []
};

// let genForLoop = bubbleSort(tempArray);
let arrayOfFunctions = [bubbleSort, selectionSort, insertionSort, mergeSort];
let functionIndex = 2;

let genForLoop = arrayOfFunctions[functionIndex](tempArray);

const chartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_ITERATION':
            let newArray = [...action.payload.array];
            let oldArray = [...action.payload.array];
            let result;
            if (!(result = genForLoop.next()).done) {
                newArray = result.value;
            } else {
                newArray = tempArray;
            }
            let indices = getDiff(oldArray, newArray);
            let status = false;
            if (isSorted(newArray)) {
                status = true;
            }

            return {
                ...state,
                array: newArray,
                currentIteration: state.currentIteration + 1,
                done: status,
                indices: status ? indices.fill(false) : indices
            };
        case 'PAUSE_ITERATION':
            return { ...state, pause: !state.pause };
        case 'RANDOMIZE':
            let n = action.payload.length || length;
            const randomArray = Array.from({ length: n }, () => Math.random() * 40);
            // genForLoop = bubbleSort(tempArray);
            genForLoop = arrayOfFunctions[functionIndex](tempArray);
            return { ...state, array: randomArray };
        case 'RESTART':
            const randomArray1 = Array.from({ length }, () => Math.random() * 40);
            // genForLoop = bubbleSort(tempArray);
            genForLoop = arrayOfFunctions[functionIndex](tempArray);
            return { ...initialState, ...action.payload, array: randomArray1 };
        default:
            return state;
    }
};

const getDiff = (a, b) => {
    const res = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i]) res[i] = false;
        else res[i] = true;
    }
    return res;
};

export default chartReducer;
