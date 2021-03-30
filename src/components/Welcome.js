import { useEffect } from 'react';
import { Link }  from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Welcome = props => {

    // useEffect(() => {
    //     const token = localStorage.token
    
    //     if (token){
    //       props.history.push('/dashboard')
    //     }}, [])


    return(
        <div style={{marginLeft: 180, marginRight: 'auto', marginTop: 80}} >
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
    )
}

export default Welcome