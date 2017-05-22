import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from './actions';

const initialState = {
  posts: [],
};

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case GET_POSTS_SUCCESS:
      newState.posts = action.posts;
      break;
  }
  return newState;
};
