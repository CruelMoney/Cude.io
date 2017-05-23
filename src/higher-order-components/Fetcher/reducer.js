import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './actions';
import{
  SAVE_EDITS_SUCCEDED
} from '../../pages/AdminOverlay/actions'

const initialState = {

};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_SUCCESS:
      return{
        ...state,
        [action.endpoint] : {
            ...[action.endpoint],
            data: action.data[Object.keys(action.data)[0]], 
            shouldFetch: false,
        }
      }
    case SAVE_EDITS_SUCCEDED:
        return{
            ...state,
            [action.endpoint] : {
                ...[action.endpoint],
                shouldFetch: true,
            }
      }
  }
  return state;
};
