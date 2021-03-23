import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Grid } from '@material-ui/core'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { loginSuccess } from '../actions'

const useStyles = makeStyles((theme) => ({

    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

function Login(props){
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

        fetch('http://localhost:3000/api/v1/auth', reqObj)
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
        <div>
            <Grid container justify="space-evenly" >
                {error ? <p>{error}</p> : null
                // make this it's own item later
                }
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <TextField onChange={handleUsername} value={username} id="username-field" label="Username" variant="outlined" />
                        <TextField onChange={handlePassword} value={password} type="password" id="password-field" label="password" variant="outlined" />
                        <Button type="submit" variant="contained" color="secondary"endIcon={<ArrowForwardIosIcon />}>Submit</Button>
                </form>
            </Grid>
        </div>
    )
}

export default Login