const initalState = { array: [25, 60, 1, 3, 67, 4] };

const chartReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'NEXT_ITERATION':
      return state;
    default:
      return state;
  }
};

export default chartReducer;
