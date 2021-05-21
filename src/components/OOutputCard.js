import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import StarsIcon from '@material-ui/icons/Stars';
import { useSelector, useDispatch } from 'react-redux'
import { updateOOutput } from '../actions'
import { withRouter } from 'react-router-dom'

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
    const dispatch = useDispatch()
    const classes = useStyles()
    const canvasRef = useRef(null)
    const [starred, setStarred] = useState(false)
    const [starId, setStarId] = useState(null)
    const auth = useSelector(state => state.auth)
    const popCanvasRef = useRef(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const [width, setWidth] = useState(48);
    const [height, setHeight] = useState(48);

    const open = Boolean(anchorEl);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        const image = document.createElement('img')
        // image.src = `http://localhost:3000${props.oOutput.ooutput.url}`
        image.src = props.oOutput.ooutput.url
        image.onload = () => {
            setWidth(image.width)
            setHeight(image.height)
            ctx.drawImage(image,0,0)
        }
        handleStarred()
    })
    
    const handleStar = () => {
        // unstar
        if (starred){
            setStarred(false)
            setStarId(null)
            fetch(`http://localhost:3000/stars/${starId}`, {method: "DELETE"})
            .then(resp => resp.json())
            .then(data => {
                dispatch(updateOOutput(data))
            })
        // star
        } else {
            setStarred(true)
            const star = {
                user_id: auth.id,
                ooutput_id: props.oOutput.id
            }
    
            const reqObj = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify(star)
            }
    
            fetch(`http://localhost:3000/stars`, reqObj)
            .then(resp => resp.json())
            .then(data => {
                setStarId(data.star.id)
                dispatch(updateOOutput(data.oOutput))
            })
        }
    }

    const handleStarred = () => {
        let star
        star = props.oOutput.stars.find(star => {
            if (star.user_id === auth.id){
                setStarred(true)
                setStarId(star.id)
                return star
            }
            return null
        })

        return star
    }

    const handleInspect = () => {
        setTimeout(() => props.history.push(`/oOutput/${props.oOutput.id}`), 0)
        
    }

    const handlePopup = event => {
        setAnchorEl(event.currentTarget)

        setTimeout(() => {
            const popCtx = popCanvasRef.current.getContext('2d')
            const popImage = document.createElement('img')
    
            // popImage.src = `http://localhost:3000${props.oOutput.input.input.url}`
            popImage.src = props.oOutput.input.input.url
            popImage.onload = () => {
                popCtx.drawImage(popImage,0,0)
            }
        }, 70);
    }

    const handleClose = () => {
        setAnchorEl(null);
      };

    return(
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea onClick={handleInspect}>
                    <canvas width={width} height={height} style={{width:"220px", height:"220px", border: '0px none black'}} ref={canvasRef}/>
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
                    <Grid container justify="flex-start">
                        <Grid item xs={9}>
                            <Button onClick={handlePopup} size="small" color="primary">
                            View Input
                            </Button>
                            <Popover 
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                            >
                            <Grid container style={{padding: 15}} spacing={2} direction="column" justify="flex-start">
                                <Typography>{props.oOutput ? props.oOutput.input.title : null}</Typography>
                                <Typography>by {props.oOutput ? props.oOutput.input_username : null}</Typography>
                                <canvas width="16" height="16" style={{width:"100px", height:"100px", border: '0px none black'}} ref={popCanvasRef}/>
                            </Grid>
                            </Popover>
                        </Grid>
                        <Grid item >
                            <IconButton onClick={handleStar} size="small" color={starred ? "secondary" : "primary"}>
                                {props.oOutput.stars.length}<StarsIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default withRouter(OOutputCard)