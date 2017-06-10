import {
  PUSH_CASE_INFO} from './actions';

const initialState = {

};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case PUSH_CASE_INFO:
        return action.theCase

  }
    
  return state;
};
