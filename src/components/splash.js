import React from 'react';
import withRouter from 'react-router';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// firebase imports
import * as db from '../services/datastore';

const styles = {
  paper: {
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 50,
  },
  text: {
    marginBottom: 30,
  },
};

class Splash extends React.Component {
  signup = () => {
    this.props.history.push('/signup');
  }

  signin = () => {
    this.props.history.push('/signin');
  }

  googleAuth = () => {
    // db.auth();
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="welcome">
        <Paper elevation={1} id="welcomeCard" className={classes.paper}>
          <Typography variant="h2" className={classes.text}>
                  Blogger
          </Typography>
          <Typography variant="subtitle1" align="center" className={classes.text}>
                  Why login? This feature will be fully fleshed out in Lab 5 when I can incorporate users schemas into the database. But for now, try it!
          </Typography>
          <div id="authActionArea">
            <div id="traditionalAuth">
              <Button onClick={this.signin} color="primary">Sign In</Button>
              <Button onClick={this.signup} variant="contained" color="primary">Sign Up</Button>
            </div>
            <Button onClick={this.googleAuth} variant="contained" color="primary">Sign In with Google</Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Splash));
