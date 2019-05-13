import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// actions imports
import { signoutUser } from '../actions';

const styles = {
  card: {
    maxWidth: 200,
  },
  media: {
    height: 140,
  },
  actions: {
    justifyContent: 'center',
  },
  login: {
    margin: '50px 60px 50px 60px',
  },
};

class BioCard extends React.Component {
  renderWhetherAuth = () => {
    if (this.props.authenticated) {
      return (
        <Button onClick={() => this.props.signoutUser(this.props.history)} size="small" color="secondary">Leave</Button>
      );
    } else {
      return (
        <Button onClick={() => this.props.history.push('/join')} size="small" color="secondary">Join</Button>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={this.props.user.imageURL}
            title="User photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {!this.props.authenticated ? 'Blogger' : `${this.props.user.name.first} ${this.props.user.name.last}`}
            </Typography>
            <Typography component="p">
              Click on tags to filter by them, or use the search bar.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          {this.renderWhetherAuth()}
        </CardActions>
      </Card>
    );
  }
}
const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(withStyles(styles)(BioCard)));
