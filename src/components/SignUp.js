import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Grid, Input } from '@material-ui/core'
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
        formData.append("username", username)
        formData.append("password", password)
        formData.append("password_confirmation", passwordConfirmation)

        const reqObj = {
            method: "POST",
            body: formData
        }

        fetch('http://localhost:3000/users', reqObj)
        .then(resp => resp.json())
        .then(data => {
            if (data.error){
                // turn this into a popup
                setError(data.error)
            } else {
                // console.log(data)
                dispatch(loginSuccess(data.user))
                localStorage.setItem('token', data.token)
                props.history.push('/dashboard')
            }
        })
    }

    return(
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
                    <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Return</Link>
                </form>
                </Grid>
                <Grid item>
                    {error ? <p>{error}</p> : null
                    // make this it's own item later
                    }
                </Grid>
            </Grid>
    )
}

export default SignUp