import { Link }  from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import classes from './BackgroundVideo.module.css';

const Welcome = props => {
    
    const videoSource = "https://waveforming.s3.us-east-2.amazonaws.com/Static+Assets/welcome_video_1.mp4"
    
    // useEffect(() => {
    //     const token = localStorage.token
    
    //     if (token){
    //       props.history.push('/dashboard')
    //     }}, [])
    // const videoSource = "https://waveforming.s3.us-east-2.amazonaws.com/WaveFunctionCollapse+2021-03-29+19-35-38_Trim.mp4"
    

    // in order to cycle through a playlist of videos, try the react player again. google fu or maybe some set interval
    // shenanigans?

    return(
        <div className={classes.container} >
            {/* <ReactPlayer url={videoSource} playing={true} loop={true} width="100%" height="100%"/> */}
            <Grid item>
                <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Grid>

                <div className={classes.Content}>
                    <div className={classes.SubContent} >

                    <Typography variant="h5">
                        waveforming
                    </Typography>
                    <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="secondary">Login</Button>
                    </Link>
                    <Link to='/sign-up' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button color="secondary">Sign-Up</Button>
                    </Link>
                    </div>
                </div>
        </div>
    )
}

export default Welcome