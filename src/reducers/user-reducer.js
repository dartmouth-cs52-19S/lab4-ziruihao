import { ActionTypes } from '../actions';

const initialState = {
  user: {
    email: null,
    name: {
      first: null,
      last: null,
    },
    initials: null,
    imageURL: null,
  },
  authenticated: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        user: action.payload,
        authenticated: true,
      };
    case ActionTypes.DEAUTH_USER:
      return {
        user: initialState.user,
        authenticated: false,
      };
    case ActionTypes.AUTH_ERROR:
      return state;
    default:
      return state;
  }
};

export default UserReducer;
