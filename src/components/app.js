import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import NavBar from './NavBar';
import Posts from '../containers/posts';
import Post from '../containers/post';
import NewPost from '../containers/new-post';
import ErrorPage from './error';

// const Nav = () => {
//   return (
//     <nav>
//       <ul>
//         <li><NavLink exact to="/">Home</NavLink></li>
//         <li><NavLink to="/posts/new">New Post</NavLink></li>
//       </ul>
//     </nav>
//   );
// };

const App = () => {
  return (
    <Router>
      <div id="view">
        <NavBar name="Zirui Hao" />
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
};

export default App;
