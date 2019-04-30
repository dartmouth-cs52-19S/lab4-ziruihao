import { combineReducers } from 'redux';

import PostReducer from './post-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  users: UserReducer,
});

export default rootReducer;
