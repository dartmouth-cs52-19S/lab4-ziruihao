import { combineReducers } from 'redux';

import PostReducer from './post-reducer';

const rootReducer = combineReducers({
  count: PostReducer,
});

export default rootReducer;
