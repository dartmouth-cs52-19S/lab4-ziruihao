import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Splash from './splash';
import Signin from './signin';
import Signup from './signup';
import NavBar from '../containers/nav-bar';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';
import RequireAuth from '../containers/require-auth';
import DontRequireAuth from '../containers/dont-require-auth';

const App = () => {
  return (
    <Router>
      <div id="view">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts/new" component={RequireAuth(NewPost)} />
          <Route exact path="/join" component={DontRequireAuth(Splash)} />
          <Route exact path="/signin" component={DontRequireAuth(Signin)} />
          <Route exact path="/signup" component={DontRequireAuth(Signup)} />
          <Route path="/posts/:id" component={Post} />
          <Route render={() => (<div>404: post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
