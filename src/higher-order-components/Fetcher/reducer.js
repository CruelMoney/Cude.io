import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './actions';
import{
  SAVE_EDITS_SUCCEDED,
  REFRESH_DATA
} from '../../pages/AdminOverlay/actions'
import{
    REGISTER_EDITS
} from '../Editor/actions'

const initialState = {
    
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_SUCCESS:
      return{
        ...state,
        [action.endpoint] : {
            ...state[action.endpoint],
            isEndpoint: true,
            data: action.data[Object.keys(action.data)[0]], 
           shouldFetch: false,
        }
      }
    case SAVE_EDITS_SUCCEDED:
        return{
            ...state,
        }
    case REFRESH_DATA:
        return{
                ...state,
                [action.endpoint] : {
                    ...state[action.endpoint],
                    data: state[action.endpoint].data.map(d=>{
                        if(d._id === action.data._id){
                            return action.data
                        }else{
                            return d
                        }
                    })
                }
            }
    case REGISTER_EDITS:
        return{
            ...state,
            [action.endpoint] : {
                ...state[action.endpoint],
                edits: {
                    ...state[action.endpoint].edits,
                    [action.id]: action.edits,
                }
               
            }
      }
  }
  return state;
};
