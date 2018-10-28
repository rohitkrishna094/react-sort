const initialState = { array: [25, 60, 1, 3, 67, 4, -1] };

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_ITERATION':
      const tempArray = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
      return { ...state, array: tempArray };
    default:
      return state;
  }
};

export default chartReducer;
