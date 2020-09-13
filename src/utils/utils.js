const defaultColor = "rgba(237,37,78,0.9)";
const compareColor = "rgba(1,25,54,1)";
const swapColor = "rgba(249,220,92,0.9)";
const sweepColor = "#28965A";

export const generateArray = (size) => Array.from({ length: size }, () => Math.random() * 40);

export const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

export const cancellableDelay = (t) => {
  let timer = 0;
  let reject = null;
  const promise = new Promise((resolve, _reject) => {
    reject = _reject;
    timer = setTimeout(resolve, t);
  });
  return {
    get promise() {
      return promise;
    },
    cancel() {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
        reject();
        reject = null;
      }
    },
  };
};

export const generateDefaultColors = (size) => Array.from({ length: size }, (x) => defaultColor);

export const generateCompareColors = (size, indices) => {
  const colors = Array.from({ length: size }, (x) => defaultColor);
  indices.forEach((ind) => (colors[ind] = compareColor));
  return colors;
};

export const generateSwapColors = (size, indices) => {
  const colors = Array.from({ length: size }, (x) => defaultColor);
  indices.forEach((ind) => (colors[ind] = swapColor));
  return colors;
};

export const generateSweepColors = (size, index) => {
  const colors = Array.from({ length: size }, (x) => defaultColor);
  for (let i = 0; i <= index; i++) {
    colors[i] = sweepColor;
  }
  return colors;
};

export const getCompareFreq = (arr, indices) => {
  const scale = 5;
  // console.log("compareFreq", indices, arr.length, arr[indices[0]], arr[indices[1]]);
  return (arr[indices[0]] + arr[indices[1]]) * scale;
};

export const getSweepFreq = (arr, index) => {
  const scale = 10;
  // console.log("sweepFreq", arr[index]);
  return arr[index] * scale;
};
