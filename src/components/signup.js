import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

// actions imports
import { signupUser } from '../actions';

const styles = {
  paper: {
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 50,
  },
  text: {
    marginBottom: 30,
  },
  padded: {
    padding: '0 0 16px 0',
  },
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: {
          first: '',
          last: '',
        },
        initials: '',
        email: '',
        password: '',
        imageURL: '',
      },
    };
  }

  signup = () => {
    // creates the initials
    const initials = this.state.user.name.first.charAt(0).toUpperCase() + this.state.user.name.last.charAt(0).toUpperCase();
    this.setState((prevState) => {
      return {
        user: Object.assign({}, prevState.user, { initials }),
      };
    }, () => this.props.signupUser(this.state.user, this.props.history));
  }

  /**
   * Updates the state with whatever the user typed into the input fields.
   */
  onInputChange = (event) => {
    const { value } = event.target;
    const prevState = this.state;
    switch (event.target.id) {
      case 'first-name':
        this.setState({
          user: Object.assign({}, prevState.user, { name: (Object.assign({}, prevState.user.name, { first: value })) }),
        });
        break;
      case 'last-name':
        this.setState({
          user: Object.assign({}, prevState.user, { name: (Object.assign({}, prevState.user.name, { last: value })) }),
        });
        break;
      case 'email':
        this.setState({
          user: Object.assign({}, prevState.user, { email: value }),
        });
        break;
      case 'pass':
        this.setState({
          user: Object.assign({}, prevState.user, { password: value }),
        });
        break;
      case 'image':
        this.setState({
          user: Object.assign({}, prevState.user, { imageURL: value }),
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="welcome">
        <Paper elevation={1} id="welcomeCard" className={classes.paper}>
          <Typography variant="h3" className={classes.text}>
            Sign Up
          </Typography>
          <TextField
            id="first-name"
            label="First name"
            className={(classes.padded)}
            value={this.state.user.name.first}
            onChange={this.onInputChange}
            placeholder={this.state.user.name.first}
            margin="none"
            fullWidth
          />
          <TextField
            id="last-name"
            label="Last name"
            className={(classes.padded)}
            value={this.state.user.name.last}
            onChange={this.onInputChange}
            placeholder={this.state.user.name.last}
            margin="none"
            fullWidth
          />
          <TextField
            id="email"
            label="Email"
            className={(classes.padded)}
            value={this.state.user.email}
            onChange={this.onInputChange}
            placeholder={this.state.user.email}
            margin="none"
            fullWidth
          />
          <TextField
            id="pass"
            label="Password"
            className={(classes.padded)}
            value={this.state.user.password}
            onChange={this.onInputChange}
            placeholder={this.state.user.password}
            margin="none"
            fullWidth
          />
          <TextField
            id="image"
            label="Profile image URL"
            className={(classes.padded)}
            value={this.state.user.imageURL}
            onChange={this.onInputChange}
            placeholder={this.state.user.imageURL}
            margin="none"
            fullWidth
          />
          <Button onClick={this.signup} variant="contained" color="primary">Sign Up</Button>
        </Paper>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(withStyles(styles)(Signup)));
