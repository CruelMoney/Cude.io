import {
  GET_CASES_SUCCESS,
  GET_CASES_FAILURE,
} from './actions';

const initialState = {
  cases: [],
};

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case GET_CASES_SUCCESS:
      newState.cases = action.Cases;
      break;
  }
  return newState;
};
