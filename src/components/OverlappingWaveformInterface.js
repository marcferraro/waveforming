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
import { OverlappingModel } from 'wavefunctioncollapse'
import { useEffect } from 'react';
import testImg from './flower.png'

// console.log(OverlappingModel)

var img_url_to_data = function(path, callback){
    var img = document.querySelector("#test")
    img.src = path
    console.log(img)
    img.onload = function(e){
        console.log('onload')
        console.log(this.width, this.height)
        var c = document.createElement("canvas")
        c.width = this.width
        c.height = this.height
        var ctx = c.getContext("2d")
        ctx.drawImage(this,0,0)
        callback(ctx.getImageData(0,0,this.width,this.height))
    }
}

var start = function(id){
    const output = document.getElementById("output")
    let ctx = output.getContext("2d")
    let imgData = ctx.createImageData(48, 48)
    // input, width, height, N, outputWidth, outputHeight, periodicInput, periodicOutput, symmetry, ground
    const model = new OverlappingModel(id.data, id.width, id.height, 3, 48, 48, true, false, 1, 0)
    console.log(model)
    //seed, limit
    var success = model.generate(Math.random, 0)
    model.graphics(imgData.data)
    ctx.putImageData(imgData, 0, 0)
    console.log(success)
    if (success === false){
        start(id)
    } 
    // else {
    //     var world = []
    //     for (var y = 0; y < 48; y++) {
    //       var row = []
    //       for (var x = 0; x < 48; x++) {
    //         var color = get_pixel(imgData, x, y).join(":")
    //         console.log(color)
    //         row.push(colormap[color])
    //       }
    //       world.push(row)
    //     }
    //     console.log(world)
    //   }
}



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

    useEffect(() => {
        console.log('useEffect')
        img_url_to_data(testImg, start)
    }, [])
    
    return(
        <div>
            <Grid container className={classes.root} spacing={6}>
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
            <img src="" alt="test img" id="test"></img>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default OverlappingWaveformInterface

// checked={shared} onChange={() => setShared(!shared)} name="share-sample" 