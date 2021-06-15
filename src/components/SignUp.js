import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Input, Typography, Button, Avatar } from '@material-ui/core'
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
    field: {
        "& .MuiFilledInput-root": {
          background: "rgb(232, 241, 250)"
        }
    },
    header: {
        fontFamily: 'kreon',
        color: '#ffffff'
    },
    return: {
        // color: ""
    }
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
                dispatch(loginSuccess(data.user))
                localStorage.setItem('token', data.token)
                props.history.push('/dashboard')
            }
        })
    }

    return(
        <Grid container className={classes.background} direction="column" justify="flex-start" alignItems="center">
            <Grid item style={{marginTop: '5%'}}>
                <Grid container direction="column" justify="flex-start" alignItems="center">
                    <Grid item >
                        <Typography variant="h3" className={classes.header}>
                                Sign Up
                        </Typography>
                    </Grid>
                    <Grid item>
                    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <Grid item>
                            <TextField onChange={handleUsername} value={username} className={classes.field} id="username-field" label="Username" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField onChange={handlePassword} value={password} className={classes.field} type="password" id="password-field" label="password" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField onChange={handlePasswordConfirmation} value={passwordConfirmation} className={classes.field} type="password" id="password-confirmation-field" label="password confirmation" variant="outlined" />
                        </Grid>
                        <Grid item >
                            <Input onChange={handleAvatar} id="avatar-upload" style={{display: 'none'}} type="file" id="avatar-upload" />
                            <label htmlFor="avatar-upload" >
                                <Button color="primary" style={{margin: 'auto', display: 'block', textAlign: 'center'}} variant="contained" component="span">
                                    Avatar (optional):
                                </Button>
                            </label>
                            <Avatar alt="avatar" id="avatar" src={avatar ? URL.createObjectURL(avatar) : ''} style={{margin: 'auto', marginTop: 13, marginBottom: 50, width: 50, height: 50}} />
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="space-around">
                                <Link to='/' className={classes.return} style={{ textDecoration: 'none' }}><Button variant="outlined" style={{color: '#ffffff', borderColor: '#000000'}}>Return</Button></Link>
                                <Button type="submit" variant="contained" style={{color: 'white', backgroundColor: 'indianred'}}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                    </Grid>
                    <Grid item>
                        {error ? <p>{error}</p> : null
                        // make this it's own item later
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SignUp

// ff5f52
// EDC272
// #268bff