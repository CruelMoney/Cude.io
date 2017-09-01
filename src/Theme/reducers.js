import openCase from './blocks/Case/reducer';
import search from './pages/OtherProjects/reducer';


const initialState = {
  todaysContributions: "_", 
  totalContributions: "_"
};

const other = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
};


export default {
  other,
  openCase,
  search
};
