import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from '../containers/auth';
import NavBar from './NavBar';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';
import ErrorPage from './error';

const App = (props) => {
  if (!props.user.loggedIn) {
    return (
      <Auth />
    );
  } else {
    return (
      <Router>
        <div id="view">
          <NavBar name={props.user.displayName} />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/posts/new" component={NewPost} />
            <Route exact path="/posts/:id" component={Post} />
            <Route path="/error" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
};

const mapStateToProps = state => (
  {
    user: state.users,
  }
);

export default connect(mapStateToProps, null)(App);
