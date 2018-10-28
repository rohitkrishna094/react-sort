export const nextIteration = (array, currentIteration) => {
  return (dispatch, getState) => {
    later(1000)
      .then(() => {
        dispatch({ type: 'NEXT_ITERATION', payload: { array, currentIteration } });
      })
      .catch(err => console.log(err));
  };
};

const later = delay => {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
};
