import { combineReducers } from 'redux';

import PostReducer from './post-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
});

export default rootReducer;
