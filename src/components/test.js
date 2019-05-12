/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import withRouter from 'react-router';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';

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

class Test extends React.Component {
  render() {
    return (<div />);
  }
}

export default withRouter(withStyles(styles)(Test));
