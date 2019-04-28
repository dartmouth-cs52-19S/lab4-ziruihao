import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// imports ActionCreators
import { removePost } from '../actions';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  renderIfEditing = () => {
    return null;
  }

  render() {
    if (this.props.post === null) {
      // props.history.push('/error');
      return (<div>404: post not found</div>);
    } else {
      console.log(this.props.post);
      return (
        <div>
          {this.props.match.params.id}
          {this.props.post.title}
          <button type="button" onClick={() => this.props.removePost(this.props.post._id, this.props.history)}>Delete Post</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.current,
  }
);

export default withRouter(connect(mapStateToProps, { removePost })(Post));
