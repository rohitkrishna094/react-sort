
export const bubbleSort = function* (arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            yield arr;
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}

export const selectionSort = function* (arr) {
    let minIdx;
    let len = arr.length;

    for (let i = 0; i < len; i++) {
        minIdx = i;
        for (let j = i + 1; j < len; j++) {
            yield arr;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr, i, minIdx);
    }
    //   return arr;
}

export const insertionSort = function* (arr) {
    for (var i = 0; i < arr.length; i++) {
        let value = arr[i];
        for (var j = i - 1; j > -1 && arr[j] > value; j--) {
            yield arr;
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = value;
    }

    // return arr;
}

export const mergeSort = function* (arr) {
    var sorted = arr.slice(),
        n = sorted.length,
        buffer = new Array(n);

    for (var size = 1; size < n; size *= 2) {
        for (var leftStart = 0; leftStart < n; leftStart += 2 * size) {
            var left = leftStart,
                right = Math.min(left + size, n),
                leftLimit = right,
                rightLimit = Math.min(right + size, n),
                i = left;
            while (left < leftLimit && right < rightLimit) {
                if (sorted[left] <= sorted[right]) {
                    buffer[i++] = sorted[left++];
                } else {
                    buffer[i++] = sorted[right++];
                }
                yield sorted;
            }
            while (left < leftLimit) {
                buffer[i++] = sorted[left++];
                yield sorted;
            }
            while (right < rightLimit) {
                buffer[i++] = sorted[right++];
                yield sorted;
            }
        }
        var temp = sorted,
            sorted = buffer,
            buffer = temp;
        yield sorted;
    }
    yield sorted;
    // return sorted;
}

export const isSorted = arr => {
    let sorted = true;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            sorted = false;
            break;
        }
    }
    return sorted;
};

export const swap = (array, i, j) => {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};
