import { combineReducers } from 'redux';
import {reducers} from 'cude-cms';
import theme from './Theme/reducers';


export default combineReducers({
  ...reducers,
  ...theme,
});
