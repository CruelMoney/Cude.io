import {
  CASE_OPENED,
  CASE_CLOSED
} from './actions';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case CASE_OPENED:
        return action.theCase
    case CASE_CLOSED:
        return null
  }


    
  return state;
};
