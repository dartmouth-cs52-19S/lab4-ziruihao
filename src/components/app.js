import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';

import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/newpost';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/posts/new">New Post</NavLink></li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route exact path="/posts/:id" component={Post} />
          <Route render={() => (<div>404: post not found</div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;