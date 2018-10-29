export const pauseProcess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'PAUSE_ITERATION', payload: { pause: getState().chart.pause } });
  };
};

export const nextIteration = (array, currentIteration) => {
  return (dispatch, getState) => {
    if (!getState().chart.pause) {
      later(100)
        .then(() => {
          dispatch({ type: 'NEXT_ITERATION', payload: { array, currentIteration } });
        })
        .catch(err => console.log(err));
    }
  };
};

const later = delay => {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
};
