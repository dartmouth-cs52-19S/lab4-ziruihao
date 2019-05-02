import { ActionTypes } from '../actions';

const initialState = {
  error: null,
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RELAY_ERROR:
      return (Object.assign({}, state, {
        error: action.payload,
      }));
    case ActionTypes.DISMISS_ERROR:
      return (Object.assign({}, state, {
        error: action.payload,
      }));
    default:
      return state;
  }
};

export default ErrorReducer;
