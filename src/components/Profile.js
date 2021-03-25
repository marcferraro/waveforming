import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Input } from '@material-ui/core'

const Profile = props => {
    const auth = useSelector(state => state.auth)
    const [avatar, setAvatar] = useState(null)

    const handleAvatar = event => {
        setAvatar(event.target.files[0])
    }

    return(
        <div style={{marginLeft: 180, marginRight: 'auto'}} >
            <Typography>
                {auth.username}
            </Typography>
            <Avatar onClick={() => console.log(avatar)} alt="avatar" src=""></Avatar>
            <Input onChange={handleAvatar} type="file" id="avatar-upload" />
            <Typography paragraph>
                What is the WaveFunctionCollapse link to project repo and how are we using it? Created by Maxim Gumin link to github
                the function takes in an initial pattern bitmap and creates an output bitmap based on that pattern. This app will riff
                on pixel art created by you.

                You can select colors to draw on the canvas with. There are some additional settings too that will have an impact on the
                output. An explanation for each:
            </Typography>
        </div>
    )
}

export default Profile