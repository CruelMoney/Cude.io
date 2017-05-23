import {
  LOGOUT,
  SAVE_EDITS,
  TOGGLE_EDITMODE,
  SAVE_EDITS_SUCCEDED,
  REFRESH_DATA
} from './actions';
import {REGISTER_EDITS} from '../../blocks/Case/actions'

const initialState = {
  user: null,
  editMode: false,
  edits: {}
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
    case REGISTER_EDITS:
      return{
        ...state,
        edits: {
          ...state.edits,
          [action.id]: action.edits
        }
      }
    case SAVE_EDITS_SUCCEDED:
      return{
          ...state,
          edits: {},
          editMode: false
        }
 
  }
};
