import {
  SEARCH} from './actions';

const initialState = {
  value: ""
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH:
        return {
          value: action.value
        }
  }
    
  return state;
};
