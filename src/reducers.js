import { combineReducers } from 'redux';
import apiData from './higher-order-components/Fetcher/reducer';
import adminOverlay from './pages/AdminOverlay/reducer';
import currentCase from './pages/CaseOverview/reducer';


const initialState = {
  todaysContributions: "_", 
  totalContributions: "_"
};

const other = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
};


export default combineReducers({
  adminOverlay,
  apiData,
  other,
  currentCase
});
