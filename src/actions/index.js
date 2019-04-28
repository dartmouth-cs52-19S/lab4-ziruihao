import axios from 'axios';

export const ActionTypes = {
  CURRENTIZE_POST: 'CURRENTIZE_POST',
  MAKE_POST: 'MAKE_POST',
  REMOVE_POST: 'REMOVE_POST',
  FETCH_POSTS: 'FETCH_POSTS',
};

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=zirui_hao';

// const post = {
//   title: 'first post',
//   tags: 'words',
//   content: 'this is a test post',
//   cover_url: 'https://media.giphy.com/media/gyRWkLSQVqlPi/giphy.gif',
// };

/**
 * Fetches all the posts.
 */
export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

/**
 * Makes a post the current post.
 * @param {*} id
 */
export function currentizePost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.CURRENTIZE_POST, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

/**
 * Creates a new post.
 */
export function makePost(post, history) {
  return () => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      fetchPosts();
      currentizePost(response.data.id);
      // dispatch({ type: ActionTypes.MAKE_POST, payload: response.data });
      history.push(`/posts/${response.data._id}`);
    }).catch((error) => {
      console.log(error);
    });
  };
}

/**
 * Removes a post.
 */
export function removePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      console.log(response);
      fetchPosts();
      dispatch({ type: ActionTypes.REMOVE_POST, payload: null });
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}
