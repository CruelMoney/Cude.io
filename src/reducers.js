import { combineReducers } from 'redux';
import apiData from './CMS/higher-order-components/Fetcher/reducer';
import adminOverlay from './CMS/pages/AdminOverlay/reducer';
import theme from './Theme/reducers';


export default combineReducers({
  adminOverlay,
  apiData,
  ...theme,
  
});
