import { combineReducers } from 'redux';
import chartReducer from './chartReducer';

const rootReducer = combineReducers({
  chart: chartReducer
});

export default rootReducer;
