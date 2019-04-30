import { ActionTypes } from '../actions';

const initialState = {
  uid: null,
  displayName: null,
  initials: null,
  photoURL: null,
  loggedIn: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_INFO:
      return (Object.assign({}, state, action.payload));
    default:
      return state;
  }
};

export default UserReducer;
