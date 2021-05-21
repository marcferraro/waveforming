import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Input, Button, Accordion, AccordionSummary, AccordionDetails, TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   justifyContent: 'space-around',
    //   overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: 20
    },
    gridList: {
      width: 400,
      height: 410,
      padding: 10
    },
    avatar: {
        width: 80,
        height: 80
    },
    column: {
        maxWidth: 400,
        marginLeft: 110
    },
    main: {
        width: '79%'
    }
  }));


const Profile = props => {
    const classes = useStyles();
    const auth = useSelector(state => state.auth)
    const oOutputs = useSelector(state => state.oOutputs)
    const inputs = useSelector(state => state.inputs)
    const [avatar, setAvatar] = useState(null)
    const [starCount, setStarCount] = useState(0)
    const [inputCount, setInputCount] = useState(0)
    const [outputCount, setOutputCount] = useState(0)
    const [inspirationCount, setInspirationCount] = useState(0)
    const [updatedUsername, setUpdatedUsername] = useState('')
    // const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (oOutputs[0]){
            handleStars()
            handleInputs()
            handleOutputs()
            handleInspiration()
            const htmlCollection = document.getElementsByClassName('canvas')
            const array = Array.from(htmlCollection);

            array.forEach(canvas => prepCanvas(canvas))
        }
    })
    
    const reverseOOutputs = () => {
        const userOOutputs = oOutputs.filter(o => o.user_id === auth.id)
        return userOOutputs.slice(0).reverse()
    }

    const prepCanvas = (canvas) => {
        const ctx = canvas.getContext('2d')
        const image = document.createElement('img')
        image.src = canvas.dataset.url
        image.onload = () => {
            ctx.drawImage(image,0,0)
        }
    }

    const handleAvatar = event => {
        setAvatar(event.target.files[0])
    }
    
    // const handleAvatarUrl = url => {
    //     setAvatarUrl('http://localhost:3000' + url)
    // }

    const submitAvatar = () => {
        const formData = new FormData();
        formData.append("avatar", avatar)
        
        fetch(`http://localhost:3000/avatar/${auth.id}`, {
            method: "PATCH",
            body: formData
          })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
    
    const handleStars = () => {
        let starred
        let stars
        starred = oOutputs.filter(o => {
            if (o.user_id === auth.id && o.stars.length > 0){
                return o.stars
            }
            return null
        })

        stars = starred.map(o => o.stars.length)
        setStarCount(stars.reduce((a, b) => a + b, 0))
    }

    const handleInputs = () => {
        const total = inputs.filter(i => i.user_id === auth.id).length
        setInputCount(total)
    }

    const handleOutputs = () => {
        const total = oOutputs.filter(o => o.user_id === auth.id).length
        setOutputCount(total)
    }

    const handleInspiration = () => {
        let array
        array = oOutputs.filter(o => {
            if (o.user_id !== auth.id && o.input.user_id === auth.id){
                return o
            }
            return null
        })

        setInspirationCount(array.length)
    }

    const handleCanvasClick = (event) => {
        setTimeout(() => props.history.push(`/oOutput/${event.target.dataset.id}`), 50)
    }

    const handleMouseHover = (event) => {
        event.target.style.opacity="80%"
    }
    
    const handleMouseLeave = (event) => {
        event.target.style.opacity="100%"
    }

    const handleUpdateUsername = event => {
        setUpdatedUsername(event.target.value)
    }

    const submitUsername = () => {

        const reqObj = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUsername)
        }

        fetch(`http://localhost:3000/username/${auth.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => console.log(data))

    }

    // need to reformat grid such that it is a two column layout so accordions don't push down other side

    return(
        <Grid className={classes.root} spacing={3} container direction="row" justify="flex-start" alignItems="center">
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.main}>
                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                        <Grid item>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>
                                    <Typography gutterBottom variant="h2">
                                        {auth.username}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar className={classes.avatar} alt="avatar" src={auth.avatar}/>
                                </Grid>
                                <Grid item style={{paddingBottom: '20px'}}>
                                    <Grid container direction="column" alignitems="center" justify="center">
                                        <Grid item>
                                            <Typography variant="h5">
                                                Total Stars: {starCount}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5">
                                                Total Inputs: {inputCount}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5">
                                                Total Outputs: {outputCount}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5">
                                            Inspirations: {inspirationCount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Typography variant="h4">Your Creations</Typography>
                                <Grid item style={{border: '1px solid black'}}>
                                    <GridList cellHeight={200} className={classes.gridList} cols={2} >
                                        {reverseOOutputs().map((o) => (
                                            <GridListTile key={o.id} cols={o.cols || 1}>
                                                <canvas onClick={handleCanvasClick} onMouseOver={handleMouseHover} onMouseLeave={handleMouseLeave} className="canvas" data-url={o.ooutput.url} data-id={o.id} width="48" height="48" style={{width:"200px", height:"200px", border: '0px none black'}} alt={o.title}/>
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
                <Grid item>
                    <Grid className={classes.column} item style={{border: '1px solid black', padding: '10px'}}>
                        <Typography variant="h6">
                            Profile Options
                        </Typography>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                        Update Avatar: 
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Input onChange={handleAvatar} type="file" id="avatar-upload" />
                                <Button onClick={submitAvatar} type="submit">Submit</Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="body1">
                                    Update Username: 
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                    <TextField onChange={handleUpdateUsername} value={updatedUsername} id="update-username-field" label="New Username" variant="outlined" />
                                    <Button onClick={submitUsername} type="submit">Submit</Button>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
        </Grid>
    )
}

export default Profile