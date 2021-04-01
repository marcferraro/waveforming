import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Input, Button } from '@material-ui/core'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: 20
    },
    gridList: {
      width: 400,
      height: 410,
      padding: 10
    },
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
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (oOutputs[0]){
            handleStars()
            handleInputs()
            handleOutputs()
        }
    }, [oOutputs])

    const handleAvatar = event => {
        setAvatar(event.target.files[0])
    }
    
    const handleAvatarUrl = url => {
        setAvatarUrl('http://localhost:3000' + url)
    }

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
            handleAvatarUrl(data.avatarUrl)
        })
    }
    
    const handleStars = () => {
        let starred
        let stars
        starred = oOutputs.filter(o => {
            if (o.user_id === auth.id && o.stars.length > 0){

                return o.stars
            }
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
        // let array
        // array = oOutputs.filter(o => {
        //     debugger
        //     if (o.user_id !== auth.id && o.input.id === auth.id){
        //         return o
        //     }
        // })

        // return array.length
    }


    return(
        <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Typography gutterBottom variant="h3">
                    {auth.username}
                </Typography>
            </Grid>
            <Grid item>
                <Avatar onClick={() => console.log(avatarUrl)} alt="avatar" src={`http://localhost:3000${auth.avatar}`}/>
            </Grid>
                <Grid item>
                    <Typography variant="body1">
                        Total Stars: {starCount}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        Total Inputs: {inputCount}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        Total Outputs: {outputCount}
                    </Typography>
                </Grid>
                {/* <Grid item>
                    <Typography variant="body1">
                        Inspirations: {handleInspiration()}
                    </Typography>
                </Grid> */}
            {/* <Grid container spacing={2} justify="flex-start" alignItems="center"> */}
                <Grid item>
                    <Typography varaint="body1">
                        Update Avatar: 
                    </Typography>
                </Grid>
                <Grid item>
                    <Input onChange={handleAvatar} type="file" id="avatar-upload" />
                    <Button onClick={submitAvatar} type="submit">Submit</Button>
                </Grid>
            {/* </Grid> */}
        </Grid>
    )
}

export default Profile