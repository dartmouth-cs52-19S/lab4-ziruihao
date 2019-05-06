import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from '../containers/auth';
import NavBar from '../containers/nav-bar';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';

const App = (props) => {
  if (!props.user.loggedIn) { // deprecated
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
            <Route exact path="/posts/new" component={NewPost} />
            <Route path="/posts/:id" component={Post} />
            <Route render={() => (<div>404: post not found </div>)} />
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
