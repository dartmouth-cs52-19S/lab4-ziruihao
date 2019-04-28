import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makePost } from '../actions';


class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        title: '',
        content: '',
        tags: '',
        cover_url: '',
      },
    };
  }

  /**
   * Updates the state with whatever the user typed into the input fields.
   */
  onInputChange = (event) => {
    const { value } = event.target;
    const prevState = this.state;
    switch (event.target.placeholder) {
      case 'Post title':
        this.setState({
          input: Object.assign({}, prevState.input, { title: value }),
        });
        break;
      case 'Post content':
        this.setState({
          input: Object.assign({}, prevState.input, { content: value }),
        });
        break;
      case 'Tags':
        this.setState({
          input: Object.assign({}, prevState.input, { tags: value }),
        });
        break;
      case 'Cover URL':
        this.setState({
          input: Object.assign({}, prevState.input, { cover_url: value }),
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <input onChange={this.onInputChange} placeholder="Post title" type="text" value={this.state.input.title} />
        <input onChange={this.onInputChange} placeholder="Post content" type="text" value={this.state.input.content} />
        <input onChange={this.onInputChange} placeholder="Tags" type="text" value={this.state.input.tags} />
        <input onChange={this.onInputChange} placeholder="Cover URL" type="text" value={this.state.input.cover_url} />
        <button type="button" onClick={() => this.props.makePost(this.state.input, this.props.history)}>Make Post</button>
      </div>
    );
  }
}

export default withRouter(connect(null, { makePost })(NewPost));
