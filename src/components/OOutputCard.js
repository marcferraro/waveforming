import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 80,
      width: 80
    },
});

const OOutputCard = props => {
    const classes = useStyles()
    // debugger
    return(
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`http://localhost:3000${props.oOutput.ooutput.url}`}
                        title="Overlapping Wave Function Output"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.oOutput.title ? props.oOutput.title : "Untitled"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Artist: {props.oOutput.user ? props.oOutput.user.username : "unknown"}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    View Input
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default OOutputCard