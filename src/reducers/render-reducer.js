import { ActionTypes } from '../actions';

const initialState = {
  filter: '',
};

const RenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      return (Object.assign({}, state, {
        filter: action.payload,
      }));
    default:
      return state;
  }
};

export default RenderReducer;
