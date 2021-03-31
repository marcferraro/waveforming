import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      maxHeight: 100
    },
    media: {
      height: "5vw",
      width: "12vh",
      backgroundColor: "blue"
    },
    content: {
        padding: 1,
        '&:last-child': {
        paddingBottom: 0,
        },
        textAlign: 'center'
    }
  });

const Color = props => {
    const classes = useStyles();
    
    return(
            <Card className={classes.root}>
                <CardActionArea >
                    <CardMedia
                        className={classes.media}
                        />
                    </CardActionArea>
                <CardContent className={clsx(classes.content)}>
                    <Typography gutterBottom variant="body2" component="h1" classname={classes.content}>
                        Lizard
                    </Typography>
                </CardContent>
            </Card>
    )
}

export default Color