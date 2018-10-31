export const restart = extraProps => {
  return (dispatch, getState) => {
    dispatch({ type: 'RESTART', payload: { ...extraProps } });
  };
};

export const randomize = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'RANDOMIZE', payload: {} });
  };
};

export const pauseProcess = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'PAUSE_ITERATION', payload: { pause: getState().chart.pause } });
  };
};

export const nextIteration = (array, currentIteration, delay) => {
  return (dispatch, getState) => {
    if (!getState().chart.pause) {
      later(delay)
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
