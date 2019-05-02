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
};

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=zirui_hao';

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

/**
 * Fetches all the posts.
 */
export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/hahaha${API_KEY}`).then((response) => {
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
    axios.get(`${ROOT_URL}/hahaha/${id}${API_KEY}`).then((response) => {
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
    axios.post(`${ROOT_URL}/hahaha${API_KEY}`, post).then(() => {
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
    axios.put(`${ROOT_URL}/hahaha/${id}${API_KEY}`, postUpdate).then((response) => {
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
    axios.delete(`${ROOT_URL}/hahaha/${id}${API_KEY}`).then((response) => {
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
