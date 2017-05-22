import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import counterReducer from './pages/CounterPage/reducer';
import blogReducer from './pages/BlogLandingPage/reducer';
import postReducer from './pages/PostPage/reducer';

export default combineReducers({
  reduxAsyncConnect,
  counterReducer,
  blogReducer,
  postReducer,

});
