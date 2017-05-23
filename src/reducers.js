import { combineReducers } from 'redux';
import apiData from './higher-order-components/Fetcher/reducer';
import adminOverlay from './pages/AdminOverlay/reducer';

export default combineReducers({
  adminOverlay,
  apiData,
});
