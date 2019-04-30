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
import reducers from './reducers';

// style imports
import './style.scss';

// import App
import App from './components/app';

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

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main'),
);
