import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// imports ActionCreators
import { removePost } from '../actions';

const Post = (props) => {
  return (
    <div />
  );
};

const mapStateToProps = state => (
  {
    post: state.posts.current,
  }
);

export default withRouter(connect(mapStateToProps, { removePost })(Post));
