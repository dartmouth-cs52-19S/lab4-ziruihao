import React from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { updateUserInfo } from '../actions';

import * as db from '../services/datastore';

const styles = {

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
    return (
      <div>
        <Button onClick={this.login}>Login</Button>
      </div>
    );
  }
}

export default connect(null, { updateUserInfo })(withStyles(styles)(Auth));
