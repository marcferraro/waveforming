import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Switch, Select, MenuItem, FormControl, FormControlLabel, FormHelperText, InputLabel, TextField } from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Select from '@material-ui/core/Select';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Add from '@material-ui/icons/Add';
// import Remove from '@material-ui/icons/Remove';
import '../overlapInterface.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
}));

function OverlappingWaveformInterface(){
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
                            {/* <FormGroup row> */}
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="n-input">N</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={2}
                                        onChange={() => console.log("select!")}
                                    >
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                    <FormHelperText>?</FormHelperText>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="symmetry-input">Symmetry</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={1}
                                        onChange={() => console.log("select!")}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                    </Select>
                                    <FormHelperText>?</FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={() => console.log("text!")} id="outlined-basic" label="Ground" variant="outlined" />
                                {/* <FormControl className={classes.formControl}>
                                    <InputLabel id="ground-input">Ground</InputLabel>
                                    <Grid container spacing={6}>
                                        <Grid item>
                                            <Remove />
                                        </Grid>
                                        <Grid item xs>
                                            <Slider defaultValue={1} onChange={() => console.log("slider!")} aria-labelledby="continuous-slider" />
                                        </Grid>
                                        <Grid item>
                                            <Add />
                                        </Grid>
                                    </Grid>
                                </FormControl> */}
                                <FormHelperText>?</FormHelperText>
                                </FormControl>
                                <FormControlLabel
                                    control={<Switch 
                                        // checked={state.checkedB}
                                        onChange={() => console.log("switch!")}
                                        name="periodic switch"
                                        color="primary"/>}
                                    label="Periodic Input"
                                />
                                <FormControlLabel
                                    control={<Switch 
                                    // checked={state.checkedB}
                                    onChange={() => console.log("switch!")}
                                    name="periodic switch"
                                    color="primary"/>}
                                    label="Periodic Output"
                                />
                            {/* </FormGroup> */}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default OverlappingWaveformInterface

// checked={shared} onChange={() => setShared(!shared)} name="share-sample" 