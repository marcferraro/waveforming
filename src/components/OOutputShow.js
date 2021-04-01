import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import StarsIcon from '@material-ui/icons/Stars';
import { useSelector, useDispatch } from 'react-redux'

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

const OOutputShow = props => {
    const classes = useStyles()
    const canvasRef = useRef(null)
    const oOutputs = useSelector(state => state.oOutputs)
    const [oOutput, setOOutput] = useState(null)

    useEffect(() => {
        const findResult = oOutputs.find(o => o.id === parseInt(props.match.params.id, 10))
        setOOutput(findResult)
        // debugger
        prepCanvas(findResult)
    }, [])

    const prepCanvas = (result) => {
        // debugger
        const ctx = canvasRef.current.getContext('2d')
        const image = document.createElement('img')
        image.src = `http://localhost:3000${result.ooutput.url}`
        image.onload = () => {
            ctx.drawImage(image,0,0)
        }
    }
    
    return(
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea>
                    <canvas width="48" height="48" style={{width:"220px", height:"220px", border: '0px none black'}} ref={canvasRef}/>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {oOutput ? oOutput.title : "Untitled"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Artist: {oOutput ? oOutput.user.username : "unknown"}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid container justify="flex-start">
                        <Grid item xs={10}>
                            <Button size="small" color="primary">
                            View Input
                            </Button>
                        </Grid>
                        <Grid item >
                            <IconButton size="small" color="primary">
                                <StarsIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default OOutputShow