import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makePost } from '../actions';


const NewPost = (props) => {
  return (
    <div>
      <button type="button" onClick={props.makePost}>New Post</button>
    </div>
  );
};

export default withRouter(connect(null, { makePost })(NewPost));
