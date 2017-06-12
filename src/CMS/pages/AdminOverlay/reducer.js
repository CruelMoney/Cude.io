import {
  LOGOUT,
  SAVE_EDITS,
  TOGGLE_EDITMODE,
  SAVE_EDITS_SUCCEDED,
  REFRESH_DATA
} from './actions';

const initialState = {
  user: null,
  editMode: false,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state
    case TOGGLE_EDITMODE:
      return{
        ...state,
        editMode: !state.editMode
      }
    case LOGOUT:
      return{
        ...state,
        user: null,
        editMode: false
      }

    case SAVE_EDITS_SUCCEDED:
      return{
          ...state,
          edits: {},
          editMode: false
        }
 
  }
};
