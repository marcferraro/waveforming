import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const Color = props => {

    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
          maxHeight: 100
        },
        media: {
          height: "5vw",
          width: "12vh",
          backgroundColor: props.hex
        },
        content: {
            padding: 1,
            '&:last-child': {
            paddingBottom: 0,
            },
            textAlign: 'center'
        }
      });

    const classes = useStyles();
    
    return(
            <Card className={classes.root}>
                <CardActionArea >
                    <CardMedia 
                    image="1"
                    className={classes.media}
                    onClick={() => props.handleClick(props.hex)}
                    />
                </CardActionArea>
                <CardContent className={clsx(classes.content)}>
                    <Typography gutterBottom variant="body2" component="h1" >
                        {props.hex}
                        {/* test */}
                    </Typography>
                </CardContent>
            </Card>
    )
}

export default Color