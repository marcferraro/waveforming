import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Switch, Select, MenuItem, FormControl, FormControlLabel, FormHelperText, InputLabel, TextField, Button } from '@material-ui/core';
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
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import iro from "@jaames/iro"
// import testImg from './flower.png'

//https://www.w3schools.com/howto/howto_js_popup.asp

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    //   marginLeft: 180,
      marginRight: 'auto'
    },
    control: {
      padding: theme.spacing(2),
    },
}));

const OverlappingWaveformInterface = props => {

    const auth = useSelector(state => state.auth)

    const [image, setImage] = useState(null)
    const [N, setN] = useState(2)
    const [symmetry, setSymmetry] = useState(1)
    const [ground, setGround] = useState(0)
    const [periodicInput, setPeriodicInput] = useState(true)
    const [periodicOutput, setPeriodicOutput] = useState(false)
    const [inputTitle, setInputTitle] = useState("")
    const [outputTitle, setOutputTitle] = useState("")

    // const colorPicker = new iro.ColorPicker('#picker');

    const classes = useStyles();

    var img_url_to_data = function(imageFile, callback){
        var img = document.createElement('img')
        img.src = URL.createObjectURL(imageFile)
        
        // console.log(img)
        img.onload = function(e){
            // console.log('onload')
            // console.log(this.width, this.height)
            const inputCanvas = document.getElementById("input")
            inputCanvas.getContext('2d').drawImage(img, 0, 0)
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
        const model = new OverlappingModel(id.data, id.width, id.height, N, 48, 48, periodicInput, periodicOutput, symmetry, ground)
        // console.log(model)
        //seed, limit
        var success = model.generate(Math.random, 0)
        model.graphics(imgData.data)
        ctx.putImageData(imgData, 0, 0)
        console.log(success)
        // if (success === false){
        //     start(id)
        // } 
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

    useEffect(() => {
        const div = document.getElementById('picker')
        const colorPicker = new iro.ColorPicker(div)
    }, [])

    const handleFile = event => {

        setImage(event.target.files[0])

        const img = document.createElement('img')
        img.src = URL.createObjectURL(event.target.files[0])
        img.onload = e => {
            const inputCanvas = document.getElementById("input")
            inputCanvas.getContext('2d').drawImage(img, 0, 0)
        }
    }

    // run input image through generator
    const generate = () => {
        if (image){
            img_url_to_data(image, start)
        } else {
            alert("No image uploaded.")
        }
    }

    // save input image to db
    const saveInput = () => {
        console.log('save input')
    }
    
    //save output image to db
    const saveOutput = () => {
        const outputCanvas = document.getElementById("output")
        const imgUrl = outputCanvas.toDataURL("image/png");
        // const img = document.createElement('img')
        // img.src = imgUrl

        const formData = new FormData();
        formData.append('ooutput', imgUrl)
        formData.append('title', outputTitle)
        formData.append('user_id', auth.id)

        const reqObj = {
            method: "POST",
            body: formData
        }

        fetch('http://localhost:3000/api/v1/ooutputs', reqObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    const handleN = event => {
        setN(event.target.value)
    }

    const handleSymmetry = event => {
        setSymmetry(event.target.value)
    }
    
    const handleGround = event => {
        setGround(parseInt(event.target.value, 10))
    }

    const handlePeriodicInput = event => {
        event.target.checked ? setPeriodicInput(true) : setPeriodicInput(false)
    }
    
    const handlePeriodicOutput = event => {
        event.target.checked ? setPeriodicOutput(true) : setPeriodicOutput(false)
    }

    const handleInputTitle = event => {
        setInputTitle(event.target.value)
    }

    const handleOutputTitle = event => {
        setOutputTitle(event.target.value)
    }

    return(
        <div className={classes.root} >
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={1} >
                        <Grid item>
                            <Grid direction="column" align-items="center" justify="center" container>
                                <Grid item>
                                    <canvas id="input" width="16" height="16" style={{width:"240px", height:"240px"}}></canvas>
                                </Grid>
                                <Grid item>
                                    <Button onClick={saveInput} variant="contained" color="secondary" >Save Input</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button onClick={generate} variant="contained" color="secondary" >Generate</Button>
                        </Grid>
                        <Grid item>
                            <Grid direction="column" align-items="center" justify="center" container>
                                <Grid item>
                                    <canvas id="output" width="48" height="48" style={{width:"240px", height:"240px"}}></canvas>
                                </Grid>
                                <Grid container>
                                    <Grid item xs>
                                        <TextField
                                            onChange={handleOutputTitle}
                                            value={outputTitle}
                                            id="outlined-basic"
                                            label="Title"
                                            variant="outlined"
                                            size="small"
                                            />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Button onClick={saveOutput} variant="contained" color="secondary" >Save Output</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
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
                                        labelId="n-select"
                                        id="n-select"
                                        value={N}
                                        onChange={handleN}
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
                                        labelId="symmetry-select"
                                        id="symmetry-select"
                                        value={symmetry}
                                        onChange={handleSymmetry}
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
                                    <TextField
                                        onChange={handleGround}
                                        type="number"
                                        value={ground}
                                        id="outlined-basic"
                                        label="ground"
                                        variant="outlined" />
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
                                        checked={periodicInput}
                                        onChange={handlePeriodicInput}
                                        name="periodic switch"
                                        color="primary"/>}
                                    label="Periodic Input"
                                />
                                <FormControlLabel
                                    control={<Switch 
                                        checked={periodicOutput}
                                        onChange={handlePeriodicOutput}
                                        name="periodic switch"
                                        color="primary"/>}
                                    label="Periodic Output"
                                />
                                <input onChange={handleFile} type="file" name="audio" accept="image/*" id="upload" />
                                <FormControl>
                                    <div id="picker"></div>
                                </FormControl>
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