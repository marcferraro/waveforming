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
import { inputSelect } from '../actions'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 48,
      width: 48,
      resize: {
          width: 220,
          height: 220
      }
    },
    grid: {
        paddingTop: 11
      }
});

const OOutputShow = props => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const canvasRef = useRef(null)
    const popCanvasRef = useRef(null)
    const oOutputs = useSelector(state => state.oOutputs)
    const inputs = useSelector(state => state.inputs)
    const [oOutput, setOOutput] = useState(null)
    const [starred, setStarred] = useState(false)
    const [starId, setStarId] = useState(null)
    const auth = useSelector(state => state.auth)
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (oOutputs[0]){
            const findResult = oOutputs.find(o => o.id === parseInt(props.match.params.id, 10))
            setOOutput(findResult)
            prepCanvas(findResult)
            handleStarred(findResult)
        }
    }, [oOutputs])

    const prepCanvas = (result) => {
        const ctx = canvasRef.current.getContext('2d')
        const image = document.createElement('img')
        image.src = `http://localhost:3000${result.ooutput.url}`
        image.onload = () => {
            ctx.drawImage(image,0,0)
        }
    }

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
                ooutput_id: oOutput.id
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

    const handleStarred = (result) => {
        let star

        star = result.stars.find(star => {
            if (star.user_id === auth.id){
                setStarred(true)
                setStarId(star.id)
                return star
            }
        })

        return star
    }

    const handlePopup = event => {
        setAnchorEl(event.currentTarget)

        setTimeout(() => {
            const popCtx = popCanvasRef.current.getContext('2d')
            const popImage = document.createElement('img')
    
            popImage.src = `http://localhost:3000${oOutput.input.input.url}`
            popImage.onload = () => {
                popCtx.drawImage(popImage,0,0)
            }
        }, 100);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleInputSelect = () => {
        const input = inputs.find(input => input.id === oOutput.input.id)
        dispatch(inputSelect(input))
        props.history.push('/new-overlapping-waveform')
    }
    
    return(
        <Grid className={classes.grid} container justify="center" alignItems="center">
            <Card className={classes.root}>
                <CardActionArea>
                    <canvas width="48" height="48" style={{width:"500px", height:"500px", border: '0px none black'}} ref={canvasRef}/>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {oOutput ? oOutput.title : "Untitled"}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        Artist: {oOutput ? oOutput.user.username : "unknown"}
                    </Typography>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="body1" color="textPrimary" component="p">
                            N: {oOutput ? oOutput.n : "unknown"}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" component="p">
                            Symmetry: {oOutput ? oOutput.symmetry : "unknown"}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" component="p">
                            Ground: {oOutput ? oOutput.ground : "unknown"}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" component="p">
                            Periodic Input: {oOutput ? `${oOutput.periodic_input}` : "unknown"}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" component="p">
                            Periodic output: {oOutput ? `${oOutput.periodic_output}` : "unknown"}
                        </Typography>
                    </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Grid container justify="flex-start">
                        <Grid item xs={10}>
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
                                <Grid container style={{padding: 20}} spacing={2} direction="column" justify="flex-start">
                                    <Typography>{oOutput ? oOutput.input.title : null}</Typography>
                                    <Typography>by {oOutput ? oOutput.input_username : null}</Typography>
                                    <canvas onClick={handleInputSelect} width="16" height="16" style={{width:"180px", height:"180px", border: '0px none black'}} ref={popCanvasRef}/>
                                </Grid>
                            </Popover>
                        </Grid>
                        <Grid item >
                            <IconButton onClick={handleStar} size="small" color={starred ? "secondary" : "primary"}>
                                {oOutput ? oOutput.stars.length : null}<StarsIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default withRouter(OOutputShow)