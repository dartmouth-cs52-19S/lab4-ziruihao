import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui imports
import PostCard from '../components/post-card';
import BioCard from './bio-card';

// actions imports
import { currentizePost, fetchPosts, makePost } from '../actions';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: {}, // this will come into play once we are able to design our own backend with customized data
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
    this.props.currentizePost(id, this.props.history);
  }

  /**
   * Goes to the post maker page.
   */
  // makePost = () => {
  //   this.props.history.push('/posts/new');
  // }

  render() {
    const posts = this.props.all.map(post => <PostCard goTo={this.goTo} key={post.id} post={post} user={this.props.user} />);
    return (
      <div id="blog">
        <div id="bio">
          <BioCard user={this.props.user} />
        </div>
        <div id="posts">
          {posts}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    all: state.posts.all,
    user: state.users,
  }
);

export default withRouter(connect(mapStateToProps, { currentizePost, fetchPosts, makePost })(Posts));
