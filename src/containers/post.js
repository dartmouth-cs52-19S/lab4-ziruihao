import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

// imports ActionCreators
import { removePost } from '../actions';

const Post = (props) => {
  if (props.post === null) {
    // props.history.push('/error');
    console.log(props.post);
    return (<div>404: post not found</div>);
  } else {
    console.log(props.post);
    return (
      <div>
        {props.match.params.id}
        {props.post.title}
        <NavLink exact to="/">
          <button type="button" onClick={() => props.removePost(props.post._id, props.history)}>Delete Post</button>
        </NavLink>
      </div>
    );
  }
};

const mapStateToProps = state => (
  {
    post: state.posts.current,
  }
);

export default withRouter(connect(mapStateToProps, { removePost })(Post));
