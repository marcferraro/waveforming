import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import overlapInterface from '../overlapInterface.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
}));

export default function OverlappingWaveformInterface(){
    const classes = useStyles();
    
    return(
        <div>
            <Grid container className={classes.root} spacing={2}>
                    <Grid container justify="center" spacing={9}>
                        <Grid item>
                            <canvas id="input" width="48" height="48" style={{width:"240px", height:"240px"}}></canvas>
                        </Grid>
                        <Grid item>
                            <canvas id="output" width="48" height="48" style={{width:"240px", height:"240px"}}></canvas>
                        </Grid>
                    </Grid>
            </Grid>
        </div>
    )
}