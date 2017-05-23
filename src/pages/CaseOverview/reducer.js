import {
  GET_CASES_SUCCESS,
  GET_CASES_FAILURE,
} from './actions';
import{
  SAVE_EDITS_SUCCEDED
} from '../AdminOverlay/actions'

const initialState = {
  cases: [],
  fetch: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_CASES_SUCCESS:
      return{
        ...state,
        fetch: false,
        cases: action.Cases
      }
    case SAVE_EDITS_SUCCEDED:
      return{
        ...state,
        fetch: true
      }
  }
  return state;
};
