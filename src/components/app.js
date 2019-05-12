import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

// import Splash from './splash';
import Signin from './signin';
import Signup from './signup';
import NavBar from '../containers/nav-bar';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';
import Test from './test';

const App = (props) => {
  if (!props.authenticated) {
    return (
      <Router>
        <Route exact path="/" component={Test} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signin" component={Signup} />
      </Router>
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
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapStateToProps, null)(App);
