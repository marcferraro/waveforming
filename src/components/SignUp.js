import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Grid, Input } from '@material-ui/core'
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

const SignUp = props => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [error, setError] = useState("")
    
    const dispatch = useDispatch()

    const classes = useStyles()

    const handleUsername = event => {
        setUsername(event.target.value)
    }

    const handlePassword = event => {
        setPassword(event.target.value)
    }

    const handlePasswordConfirmation = event => {
        setPasswordConfirmation(event.target.value)
    }

    const handleAvatar = event => {
        setAvatar(event.target.files[0])
    }

    const handleSubmit = event => {
        event.preventDefault()


        const formData = new FormData();
        formData.append("avatar", avatar)
        
        // const user = {
        //     user: {
        //         username: username,
        //         password: password,
        //         password_confirmation: passwordConfirmation
        //     }
        // }

        const reqObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        fetch('http://localhost:3000/api/v1/users', reqObj)
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
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <Grid item>
                        <TextField onChange={handleUsername} value={username} id="username-field" label="Username" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField onChange={handlePassword} value={password} type="password" id="password-field" label="password" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField onChange={handlePasswordConfirmation} value={passwordConfirmation} type="password" id="password-confirmation-field" label="password confirmation" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <Input onChange={handleAvatar} type="file" id="avatar-upload" />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="secondary"endIcon={<ArrowForwardIosIcon />}>Submit</Button>
                    </Grid>
                </form>
                </Grid>
                <Grid item>
                    {error ? <p>{error}</p> : null
                    // make this it's own item later
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp