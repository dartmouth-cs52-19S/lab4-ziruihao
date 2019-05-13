import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// own imports
import BioCard from '../components/bio-card';
import PostCard from './post-card';

// actions imports
import {
  setFilter, currentizePost, fetchPosts, makePost,
} from '../actions';

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
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.setFilter('');
  }


  // /**
  //  * The dynamite solution to lumberjacking.
  //  */
  // componentDidUpdate() {
  //   this.props.fetchPosts();
  // }

  /**
   * Opens the snackbar.
   */
  openSnack = () => {
    this.setState({ snackOpen: true });
  };

  /**
   * Closes the snackbar.
   */
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

  renderPosts = () => {
    let posts;
    if (this.props.filter === '') {
      posts = this.props.all.map(post => <PostCard goTo={this.goTo} openSnack={this.openSnack} key={post.id} post={post} user={this.props.user} />);
    } else {
      posts = this.props.all.filter((post) => { return post.tags.includes(this.props.filter); })
        .map(post => <PostCard goTo={this.goTo} openSnack={this.openSnack} filter={this.setFilter} key={post.id} post={post} user={this.props.user} />);
    }
    return posts;
  }

  render() {
    const { classes } = this.props;
    const posts = this.renderPosts();
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
    user: state.auth.user,
    filter: state.render.filter,
  }
);

export default withRouter(connect(mapStateToProps, {
  setFilter, currentizePost, fetchPosts, makePost,
})(withStyles(styles)(Posts)));
