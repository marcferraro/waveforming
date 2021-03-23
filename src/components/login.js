import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Grid } from '@material-ui/core'
import { useState } from 'react';

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
        .then(user => console.log(user))
    }

    return(
        <div>
            <Grid container justify="space-evenly" >
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