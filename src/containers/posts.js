import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: {},
    };
  }
}

const mapStateToProps = state => (
  {
    all: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, null)(Posts));
