import React from 'react';
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
};

function BioCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.user.photoURL}
          title="User photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.user.displayName}
          </Typography>
          <Typography component="p">
            I am a computer science and philosophy major at Dartmouth College. This is my blog.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="secondary">
          Follow
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(withStyles(styles)(BioCard));
