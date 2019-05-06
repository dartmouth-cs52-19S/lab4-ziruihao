import { ActionTypes } from '../actions';

const initialState = {
  uid: null,
  displayName: 'Zirui Hao',
  initials: 'ZH',
  photoURL: 'http://www.1zoom.me/big2/203/283931-alexfas01.jpg',
  loggedIn: true,
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
