import axios from 'axios';

export const ActionTypes = {
  CURRENTIZE_POST: 'CURRENTIZE_POST',
  MAKE_POST: 'MAKE_POST',
  UPDATE_POST: 'UPDATE_POST',
  REMOVE_POST: 'REMOVE_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  SET_FILTER: 'SET_FILTER',
  RELAY_ERROR: 'RELAY_ERROR',
  DISMISS_ERROR: 'DISMISS_ERROR',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

const ROOT_URL = 'https://cs52-lab5-ziruihao.herokuapp.com/api';

/**
 * Relays error to store.
 */
export function relayError(error) {
  return {
    type: ActionTypes.RELAY_ERROR,
    payload: error,
  };
}
/**
 * Dismisses any errors.
 */
export function dismissError() {
  return {
    type: ActionTypes.DISMISS_ERROR,
    payload: null,
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError() {
  return {
    type: ActionTypes.AUTH_ERROR,
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      console.log(response);
      // dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data);
      axios.defaults.headers.common = { Authorization: localStorage.getItem('token') };
      history.push('/');
    }).catch((error) => {
      dispatch(relayError(error.message));
      dispatch(authError());
    });
  };
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
}


export function signupUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user).then((response) => {
      console.log(response);
      // dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data);
      axios.defaults.headers.common = { Authorization: localStorage.getItem('token') };
      history.push('/');
    }).catch((error) => {
      dispatch(relayError(error.message));
      dispatch(authError());
    });
  };
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

/**
 * Fetches all the posts.
 */
export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    }).catch((error) => {
      dispatch(relayError(error.message));
    });
  };
}

/**
 * Makes a post the current post.
 * @param {*} id
 */
export function currentizePost(id, history) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: ActionTypes.CURRENTIZE_POST, payload: response.data });
      history.push(`/posts/${id}`);
    }).catch((error) => {
      dispatch(relayError(error.message));
    });
  };
}

/**
 * Creates a new post.
 */
export function makePost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post).then(() => {
      fetchPosts()(dispatch);
      history.push('/');
    }).catch((error) => {
      dispatch(relayError(error.message));
    });
  };
}

/**
 * Makes changes to a post.
 */
export function updatePost(postUpdate, id) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, postUpdate).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
    }).catch((error) => {
      dispatch(relayError(error.message));
    });
  };
}

/**
 * Removes a post.
 */
export function removePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`).then((response) => {
      console.log(response);
      fetchPosts()(dispatch);
      dispatch({ type: ActionTypes.REMOVE_POST, payload: null });
      history.push('/');
    }).catch((error) => {
      dispatch(relayError(error.message));
    });
  };
}

/**
 * Updates based on user login.
 */
export function updateUserInfo(user) {
  return {
    type: ActionTypes.UPDATE_USER_INFO,
    payload: user,
  };
}

/**
 * Sets any filters.
 */
export function setFilter(filter) {
  return {
    type: ActionTypes.SET_FILTER,
    payload: filter,
  };
}
