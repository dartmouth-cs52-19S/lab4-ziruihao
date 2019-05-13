// React imports
import React from 'react';
import ReactDOM from 'react-dom';

// material-ui imports
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { amber, deepPurple } from '@material-ui/core/colors/';

// Redux imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from './reducers';

// actions
import { ActionTypes } from './actions';

// style imports
import './style.scss';

// import App
import App from './components/app';
import ErrorChip from './containers/error';

// creates the store
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

/**
 * Theme override for material-ui
 */
const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: deepPurple,
  },
});
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
if (token && user !== null) {
  console.log(token);
  store.dispatch({ type: ActionTypes.AUTH_USER, payload: user });
  axios.defaults.headers.common = { Authorization: localStorage.getItem('token') };
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
      <ErrorChip />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main'),
);
