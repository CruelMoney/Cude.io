import {
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from './constants';

const initialState = {
  post: {},
};

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case GET_POST_SUCCESS:
      newState.post = action.post;
      break;
  }
  return newState;
};
