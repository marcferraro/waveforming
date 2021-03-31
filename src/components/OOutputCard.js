import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef } from 'react';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 48,
      width: 48,
      resize: {
          width: 220,
          height: 220
      }
    },
});

const OOutputCard = props => {
    const classes = useStyles()
    const canvasRef = useRef(null)
    // debugger

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        const image = document.createElement('img')
        image.src = `http://localhost:3000${props.oOutput.ooutput.url}`
        image.onload = () => {
            ctx.drawImage(image,0,0)
        }
    }, [])
    
    return(
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea>
                    {/* <CardMedia
                        className={classes.media}
                        image={`http://localhost:3000${props.oOutput.ooutput.url}`}
                        title="Overlapping Wave Function Output"
                    /> */}
                    {/* <img src={`http://localhost:3000${props.oOutput.ooutput.url}`} width="48" height="48" style={{width:"240px", height:"240px"}}/> */}
                    <canvas width="48" height="48" style={{width:"220px", height:"220px", border: '0px none black'}} ref={canvasRef}/>
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