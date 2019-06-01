import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// mateiral-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import classnames from 'classnames';
import marked from 'marked';

// actions imports
import {
 updatePost, currentizePost, removePost, relayError 
} from '../actions';

import * as s3 from '../services/s3';

const styles = ({
  root: {
    width: 800,
    paddingBottom: 30,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  padded: {
    padding: '16px 0 0 0',
  },
  moreSpace: {
    lineHeight: '200%',
  },
  avatar: {
    backgroundColor: red[500],
  },
  textField: {
    margin: '16px 0 0 0',
  },
  tagsArea: {
    padding: '16px 0 0 0',
  },
  chip: {
    margin: '0 2px 0 2px',
  },
  actions: {
    display: 'flex',
    padding: '16px 0 0 0',
  },
});

class Post extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.post === null) {
      this.state = {
        isEditing: false,
        anchorEl: null,
        tagsString: '',
        input: {
          title: '',
          content: '',
          tags: [],
          cover_url: '',
        },
        preview: {},
        file: {},
      };
    } else {
      this.state = {
        isEditing: false,
        anchorEl: null,
        tagsString: props.post.tags.join(' '),
        input: {
          title: props.post.title,
          content: props.post.content,
          tags: props.post.tags,
          cover_url: props.post.cover_url,
        },
      };
    }
  }

  componentDidMount() {
    this.props.currentizePost(this.props.match.params.id, this.props.history);
  }

  /**
   * Vets a post input before sending it off to axios.
   */
  postValidator = () => {
    const inputModified = Object.assign({}, this.state.input);
    if (this.state.input.title === '') {
      inputModified.title = 'Untitled post';
    }
    if (this.state.input.tags.length === 0) {
      inputModified.tags = ['#notags'];
    }
    if (this.state.file) {
      s3.uploadImage(this.state.file).then((url) => {
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        this.props.updatePost(inputModified, this.props.post._id);
        this.toggleEdit();
      }).catch((error) => {
        this.props.relayError(error.message);
      });
    }
  }

  /**
   * Updates the state with whatever the user typed into the input fields.
   */
  onInputChange = (event) => {
    const { value } = event.target;
    const file = event.target.files[0];
    const prevState = this.state;
    switch (event.target.id) {
      case 'title':
        this.setState({
          input: Object.assign({}, prevState.input, { title: value }),
        });
        break;
      case 'content':
        this.setState({
          input: Object.assign({}, prevState.input, { content: value }),
        });
        break;
      case 'tags':
        this.setState({
          input: Object.assign({}, prevState.input, { tags: value.split(' ') }),
          tagsString: value,
        });
        break;
      case 'cover-url':
        // Handle null file
        // Get url of the file and set it to the src of preview
        if (file) {
          this.setState({ preview: window.URL.createObjectURL(file), file });
        }
        // this.setState({
        //   input: Object.assign({}, prevState.input, { cover_url: value }),
        // });
        break;
      default:
        break;
    }
  }

  /**
   * Opens the menu.
   */
  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Closes the menu.
   */
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  /**
   * Toggles edit mode.
   */
  toggleEdit = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }

  renderIfEditing = () => {
    const { classes } = this.props;

    const isMenuOpen = Boolean(this.state.anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.toggleEdit}>Edit</MenuItem>
        <MenuItem onClick={() => { this.props.removePost(this.props.post._id, this.props.history); this.handleMenuClose(); }}>Delete</MenuItem>
      </Menu>
    );

    const tags = this.props.post.tags.map(tag => <Chip key={tag} label={tag} className={classes.chip} />);

    if (this.state.isEditing) {
      return (
        <div id="blog">
          <Paper className={classes.root} elevation={1}>
            <CardMedia
              className={classes.media}
              image={this.props.post.cover_url}
              title="Post image"
            />
            <div id="blogStuff">
              <CardHeader
                avatar={(
                  <Avatar className={classes.avatar}>
                    {this.props.user.initials}
                  </Avatar>
                )}
                action={(
                  <IconButton onClick={this.handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                )}
                subheader={`${this.props.post.author.name.first} wrote on September 14, 2016`}
                className={classes.padded}
              />
              <TextField
                id="title"
                label="Title"
                className={classnames(classes.textField)}
                value={this.state.input.title}
                onChange={this.onInputChange}
                placeholder={this.state.input.title}
                margin="none"
                multiline
                fullWidth
              />
              <TextField
                id="content"
                label="Content"
                className={classnames(classes.textField)}
                value={this.state.input.content}
                onChange={this.onInputChange}
                placeholder={this.state.input.content}
                margin="none"
                multiline
                fullWidth
              />
              <TextField
                id="tags"
                label="Tags - format like '#tag1 #tag2'"
                className={classnames(classes.textField)}
                value={this.state.tagsString}
                onChange={this.onInputChange}
                placeholder={this.state.tagsString}
                margin="none"
                multiline
                fullWidth
              />
              <TextField
                id="cover-url"
                label="Cover image url"
                className={classnames(classes.textField)}
                value={this.state.input.cover_url}
                onChange={this.onInputChange}
                placeholder={this.state.input.cover_url}
                margin="none"
                multiline
                fullWidth
              />
              <img id="preview" alt="preview" src={this.state.preview} />
              <input type="file" name="coverImage" onChange={this.onImageUpload} />
              <div id="submitArea">
                <Button onClick={this.postValidator} size="medium" variant="contained" color="primary">Save</Button>
              </div>
            </div>
            {renderMenu}
          </Paper>
        </div>
      );
    } else {
      return (
        <div id="blog">
          <Paper className={classes.root} elevation={1}>
            <CardMedia
              className={classes.media}
              image={this.props.post.cover_url}
              title="Post image"
            />
            <div id="blogStuff">
              <CardHeader
                avatar={(
                  <Avatar className={classes.avatar}>
                    {this.props.post.author.initials}
                  </Avatar>
                )}
                action={(
                  <IconButton onClick={this.handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                )}
                subheader={`${this.props.post.author.name.first} wrote on September 14, 2016`}
                className={classes.padded}
              />
              <Typography variant="h3" component="h3" className={classes.padded}>
                {this.props.post.title}
              </Typography>
              <Typography component="p"
                className={classnames(classes.padded, classes.moreSpace)}
                dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }}
              />
              <CardContent className={classes.tagsArea}>
                {tags}
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </div>
            {renderMenu}
          </Paper>
        </div>
      );
    }
  }

  render() {
    if (this.props.post === null) {
      return (<div><CircularProgress />404: post not found</div>);
    } else {
      return this.renderIfEditing();
    }
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.current,
    user: state.auth.user,
  }
);

export default withRouter(connect(mapStateToProps, {
 updatePost, currentizePost, removePost, relayError 
})(withStyles(styles)(Post)));
