import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui imports

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// own imports
import BioCard from './bio-card';
import PostCard from '../components/post-card';

// actions imports
import { currentizePost, fetchPosts, makePost } from '../actions';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
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

  openSnack = () => {
    this.setState({ snackOpen: true });
  };

  closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackOpen: false });
  };

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
    const { classes } = this.props;
    const posts = this.props.all.map(post => <PostCard goTo={this.goTo} openSnack={this.openSnack} key={post.id} post={post} user={this.props.user} />);
    return (
      <div id="blog">
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.closeSnack}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">This feature will be available in Lab 5!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.closeSnack}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <div id="bio">
          <BioCard user={this.props.user} openSnack={this.openSnack} />
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

export default withRouter(connect(mapStateToProps, { currentizePost, fetchPosts, makePost })(withStyles(styles)(Posts)));
