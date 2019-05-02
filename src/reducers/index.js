import { combineReducers } from 'redux';

import PostReducer from './post-reducer';
import UserReducer from './user-reducer';
import RenderReducer from './render-reducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  users: UserReducer,
  render: RenderReducer,
  errors: ErrorReducer,
});

export default rootReducer;
