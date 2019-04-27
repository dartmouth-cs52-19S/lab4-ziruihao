import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MAKE_POST:
      return (Object.assign({}, state, {
        all: action.payload,
        current: action.payload,
      }));
    case ActionTypes.REMOVE_POST:
      return (Object.assign({}, state, {
        all: action.payload,
        current: action.payload,
      }));
    default:
      return state;
  }
};

export default PostReducer;
