import { combineReducers } from 'redux';
import soilReducer from './soilReducer';

const rootReducer = combineReducers({
  soil: soilReducer
});

export default rootReducer;
