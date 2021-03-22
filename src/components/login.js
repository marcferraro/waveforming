import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

function Login(props){
    const classes = useStyles()

    const handleSubmit = () => {
        console.log('submit')
    }

    return(
        <div>
            <Grid container justify="space-evenly" >
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <TextField onChange={(event) => console.log('change')} id="outlined-basic" label="Username" variant="outlined" />
                        <Button type="submit" variant="contained" color="secondary"endIcon={<ArrowForwardIosIcon />}>Submit</Button>
                </form>
            </Grid>
        </div>
    )
}

export default Login