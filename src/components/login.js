import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginSuccess } from '../actions'
import { Link }  from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    background: {
        backgroundColor: '#546e7a',
        width: '100%',
        height: '100%'
    },
    header: {
        fontFamily: 'kreon',
        color: '#ffffff'
    }
}));

const Login = props => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    const dispatch = useDispatch()

    const classes = useStyles()

    const handleUsername = event => {
        setUsername(event.target.value)
    }

    const handlePassword = event => {
        setPassword(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()

        const user = {
            username: username,
            password: password
        }

        const reqObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch('http://localhost:3000/auth', reqObj)
        .then(resp => resp.json())
        .then(data => {
            if (data.error){
                // turn this into a popup
                setError(data.error)
            } else {
                dispatch(loginSuccess(data.user))
                localStorage.setItem('token', data.token)
                props.history.push('/dashboard')
            }
        })
    }

    return(
        <Grid className = {classes.background} container direction="column" justify="flex-start" alignItems="center" >
            <Grid item style={{marginTop: 100}}>
                <Typography variant="h3" className={classes.header}>
                    Login
                </Typography>
            </Grid>
            <Grid item className={classes.root}>
                <Grid item>
                    <TextField onChange={handleUsername} value={username} id="username-field" label="Username" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField onChange={handlePassword} value={password} type="password" id="password-field" label="password" variant="outlined" />
                </Grid>
                <Grid item>
                    <Button onClick={handleSubmit} style={{margin: 'auto', display: 'block', textAlign: 'center', backgroundColor: 'indianred'}} variant="contained" color="secondary" component='span'>Submit</Button>
                </Grid>
                <Link to='/' className={classes.return} style={{ textDecoration: 'none' }}><Button variant="outlined" style={{color: '#ffffff', borderColor: '#000000'}}>Return</Button></Link>
            </Grid>
            <Grid item>
                {error ? <p>{error}</p> : null
                // make this it's own item later
                }
            </Grid>
        </Grid>
    )
}

export default Login