import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Input, Button } from '@material-ui/core'
import { Grid } from '@material-ui/core';

const Profile = props => {
    const auth = useSelector(state => state.auth)
    const oOutputs = useSelector(state => state.oOutputs)
    const [avatar, setAvatar] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState('')

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
        <div >
            <Typography gutterBottom variant="h3">
                {auth.username}
            </Typography>
            <Avatar onClick={() => console.log(avatarUrl)} alt="avatar" src={`http://localhost:3000${auth.avatar}`}/>
            <Grid container>
                <Grid item>
                    <Typography variant="body1">
                        Inspirations: {handleInspiration()}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} justify="flex-start" alignItems="center">
                <Grid item>
                    <Typography varaint="body1">
                        Update Avatar: 
                    </Typography>
                </Grid>
                <Grid item>
                    <Input onChange={handleAvatar} type="file" id="avatar-upload" />
                    <Button onClick={submitAvatar} type="submit">Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile