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
import { signinUser } from '../actions';

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

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      },
    };
  }

  /**
   * Activates login step in firebase.
   */
  signin = () => {
    this.props.signinUser(this.state.user, this.props.history);
  }

  /**
   * Updates the state with whatever the user typed into the input fields.
   */
  onInputChange = (event) => {
    const { value } = event.target;
    const prevState = this.state;
    switch (event.target.id) {
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
            Sign In
          </Typography>
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
          <Button onClick={this.signin} variant="contained" color="primary">Sign In</Button>
        </Paper>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(withStyles(styles)(Signin)));
