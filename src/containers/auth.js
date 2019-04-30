import React from 'react';

import { connect } from 'react-redux';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// actions imports
import { updateUserInfo } from '../actions';

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

class Auth extends React.Component {
  /**
   * Activates login step in firebase.
   */
  login = () => {
    db.auth(this.updateUserInfo);
  }

  /**
   * Updates newly logged-in user.
   */
  updateUserInfo = (uid, displayName, photoURL) => {
    let initials = '';
    displayName.split(' ').forEach((string) => {
      initials += string.charAt(0);
    });
    this.props.updateUserInfo({
      uid,
      displayName,
      initials,
      photoURL,
      loggedIn: true,
    });
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
          <div id="loginArea">
            <Button onClick={this.login} variant="contained" color="primary">Login</Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(null, { updateUserInfo })(withStyles(styles)(Auth));
