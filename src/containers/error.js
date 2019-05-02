import React from 'react';
import { connect } from 'react-redux';

// material-ui imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// actions imports
import { dismissError } from '../actions';

class ErrorChip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
    };
  }

  /**
   * Closes the snackbar.
   */
  closeDialog = (reason) => {
    if (reason === 'clickaway') {
      console.log('oops');
      return;
    }
    // this.setState({ dialogOpen: false });
    this.props.dismissError();
  };

  render() {
    console.log(this.props.error);
    if (!(this.props.error === null)) {
      return (
        <div id="errorArea">
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">An rrror has occured</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.props.error}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => (
  {
    error: state.errors.error,
  }
);
export default (connect(mapStateToProps, { dismissError })(((ErrorChip))));
