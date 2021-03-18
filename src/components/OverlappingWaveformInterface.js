import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import overlapInterface from '../overlapInterface.css'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
                <Grid item xs={12}>
                    <Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={1} >
                        <Grid item>
                            <canvas id="input" width="48" height="48" style={{width:"240px", height:"240px"}}></canvas>
                        </Grid>
                        <Grid item>
                            <canvas id="output" width="48" height="48" style={{width:"240px", height:"240px"}}></canvas>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={1}>
                            buttons and attributes n stuff
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}