import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import classnames from 'classnames';

// imports ActionCreators
import { makePost, relayError } from '../actions';

import uploadImage from '../services/s3';

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
    padding: '0 0 16px 0',
  },
  moreSpace: {
    lineHeight: '200%',
  },
  avatar: {
    backgroundColor: red[500],
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
  button: {
    margin: '0 16px 0 16px',
  },
  previewImage: {
    width: 400,
    height: 'auto',
  },
});

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      uploadImage(this.state.file).then((url) => {
        this.setState(prevState => ({
          input: Object.assign({}, prevState.input, { cover_url: url }),
        }));
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        this.props.makePost(inputModified, this.props.history);
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
        if (event.target.files[0]) {
          this.setState({ preview: window.URL.createObjectURL(event.target.files[0]), file: event.target.files[0] });
        }
        // this.setState({
        //   input: Object.assign({}, prevState.input, { cover_url: value }),
        // });
        break;
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="blog">
        <Paper className={classes.root} elevation={1}>
          <div id="blogStuff">
            <Typography variant="h4" component="h4" className={classes.padded}>
              New Post
            </Typography>
            <TextField
              id="title"
              label="Title"
              className={classnames(classes.padded)}
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
              className={classnames(classes.padded)}
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
              className={classnames(classes.padded)}
              value={this.state.tagsString}
              onChange={this.onInputChange}
              placeholder={this.state.tagsString}
              margin="none"
              multiline
              fullWidth
            />
            {/* <TextField
              id="cover-url"
              label="Cover image url"
              className={classnames(classes.padded)}
              value={this.state.input.cover_url}
              onChange={this.onInputChange}
              placeholder={this.state.input.cover_url}
              margin="none"
              multiline
              fullWidth
            /> */}
            <img id="preview" className={classes.previewImage} alt="preview" src={this.state.preview} />
            <input id="cover-url" type="file" name="coverImage" onChange={this.onInputChange} />
            <div id="submitArea">
              <Button onClick={this.postValidator} size="medium" variant="contained" color="primary" className={classes.button}>Save</Button>
              <Button onClick={() => this.props.history.push('/')} size="medium" variant="contained" color="default" className={classes.button}>Cancel</Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(connect(null, { makePost, relayError })(withStyles(styles)(NewPost)));
