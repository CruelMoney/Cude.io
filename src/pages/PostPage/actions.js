import {
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from './constants';

export function getPostsSuccess(posts) {
  return {
    type: GET_POST_SUCCESS,
    posts,
  };
}

export  function getPostsFailure() {
  return {
    type: GET_POST_FAILURE
  }
}