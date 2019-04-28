import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: null,
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENTIZE_POST:
      return (Object.assign({}, state, {
        current: action.payload,
      }));
    case ActionTypes.MAKE_POST:
      return (Object.assign({}, state, {
        current: action.payload,
      }));
    case ActionTypes.REMOVE_POST:
      return (Object.assign({}, state, {
        current: null,
      }));
    case ActionTypes.FETCH_POSTS:
      return (Object.assign({}, state, {
        all: action.payload,
      }));
    default:
      return state;
  }
};

export default PostReducer;
