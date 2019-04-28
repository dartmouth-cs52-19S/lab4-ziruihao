import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PostThumbnail from '../components/post-thumbnail';
import { currentizePost, fetchPosts, makePost } from '../actions';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: {},
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  // /**
  //  * The dynamite solution to lumberjacking.
  //  */
  // componentDidUpdate() {
  //   this.props.fetchPosts();
  // }

  /**
   * Goes to a certain post.
   */
  goTo = (id) => {
    this.props.currentizePost(id);
  }

  /**
   * Goes to the post maker page.
   */
  makePost = () => {
    this.props.history.push('/posts/new');
  }

  render() {
    const posts = this.props.all.map(post => <PostThumbnail goTo={this.goTo} key={post.id} post={post} />);
    return (
      <div>
        <div>{this.props.match.params.id}</div>
        <button type="button" onClick={this.props.fetchPosts}>Get Posts</button>
        <button type="button" onClick={this.makePost}>Make Post</button>
        {posts}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    all: state.posts.all,
  }
);

export default withRouter(connect(mapStateToProps, { currentizePost, fetchPosts, makePost })(Posts));
