import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


// material-ui imports
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Chip from '@material-ui/core/Chip';

// actions imports
import { removePost } from '../actions';


const styles = theme => ({
  card: {
    width: 480,
    marginBottom: 60,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  tagsArea: {
    padding: 8,
  },
  chip: {
    margin: '0 2px 0 2px',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class PostCard extends React.Component {
  state = { anchorEl: null };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;

    const isMenuOpen = Boolean(this.state.anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Pin</MenuItem>
        <MenuItem onClick={() => { this.props.removePost(this.props.post.id, this.props.history); this.handleMenuClose(); }}>Delete</MenuItem>
      </Menu>
    );

    const tags = this.props.post.tags.split(' ').map(tag => <Chip key={tag} label={tag} className={classes.chip} />);

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar aria-label="Recipe" className={classes.avatar}>
              ZH
            </Avatar>
          )}
          action={(
            <IconButton onClick={this.handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          )}
          title={this.props.post.title}
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={this.props.post.cover_url}
          title="Post image"
        />
        <CardContent className={classes.tagsArea}>
          {tags}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <Button onClick={() => this.props.goTo(this.props.post.id)} className={classes.expand} color="primary">View</Button>
        </CardActions>
        {renderMenu}
      </Card>

    );
  }
}

export default withRouter(connect(null, { removePost })(withStyles(styles)(PostCard)));
