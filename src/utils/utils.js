const defaultColor = "rgba(237,37,78,0.9)";
const compareColor = "rgba(1,25,54,1)";
const swapColor = "rgba(249,220,92,0.9)";

export const generateArray = (size) => Array.from({ length: size }, () => Math.random() * 40);

export const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

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

