import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';

const Profile = props => {
    const auth = useSelector(state => state.auth)

    return(
        <div style={{marginLeft: 180, marginRight: 'auto'}} >
            <Typography>
                {auth.username}
            </Typography>
            <Avatar alt="avatar" src=""></Avatar>
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