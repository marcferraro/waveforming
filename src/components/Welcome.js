import { useEffect } from 'react';
import { Link }  from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player'
import classes from './BackgroundVideo.module.css';

const Welcome = props => {

    // useEffect(() => {
    //     const token = localStorage.token
    
    //     if (token){
    //       props.history.push('/dashboard')
    //     }}, [])
    const videoSource = "https://waveforming.s3.us-east-2.amazonaws.com/WaveFunctionCollapse.mp4"

    return(
        <div className={classes.container} >

                {/* <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}

            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

                <div className={classes.Content}>
                    <div className={classes.SubContent} >

                    <Typography >
                        waveforming
                    </Typography>
                    <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button>Login</Button>
                    </Link>
                    <Link to='/sign-up' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button>Sign-Up</Button>
                    </Link>
                    </div>
                </div>
        </div>
    )
}
// style={{marginLeft: 180, marginRight: 'auto', marginTop: 80}}

export default Welcome