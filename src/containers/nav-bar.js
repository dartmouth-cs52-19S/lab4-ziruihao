import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// actions imports
import { setFilter, signoutUser } from '../actions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toolbar: {
    width: 800,
  },
  growBig: {
    flexGrow: 2,
  },
  growSmall: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class NavBar extends React.Component {
  renderIfAuth = () => {
    const { classes } = this.props;
    if (this.props.authenticated) {
      return (<Button className={classes.title} onClick={() => this.props.signoutUser(this.props.history)} color="inherit">Leave</Button>);
    } else {
      return (<Button className={classes.title} onClick={() => this.props.history.push('/join')} color="inherit">Join</Button>);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar className={classes.toolbar}>
            {this.renderIfAuth()}
            <div className={classes.growSmall} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Filter with #tag"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={event => this.props.setFilter(event.target.value)}
                value={this.props.filter}
              />
            </div>
            <div className={classes.growBig} />
            <Button onClick={() => this.props.history.push('/')} color="inherit">Posts</Button>
            <IconButton onClick={() => this.props.history.push('/posts/new')} color="inherit">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    filter: state.render.filter,
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { setFilter, signoutUser })(withStyles(styles)(NavBar)));
