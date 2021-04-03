import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Switch, Select, MenuItem, FormControl, FormControlLabel, FormHelperText, InputLabel, TextField, Button, Popover, Typography } from '@material-ui/core';
import '../overlapInterface.css'
import { OverlappingModel } from 'wavefunctioncollapse'
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import iro from "@jaames/iro"
import Color from './Color'
import { oOutputCreationSuccess, inputCreationSuccess, inputSelect } from '../actions'

// if adding the ability to load from people's creations, make a check for props function in the useEffect and configure from there
// better idea - when an input is selected, we put the id (or hell maybe even the whole object to eliminate and iteration)
// and on every new generation we check for it and if true, we load it in. When the user leaves, we can use return in 
// useEffect to set it back to null.
    // inputs need colors for this to fully work too ~
    // currently we are just adding all the colors that have been used, regardless of if they were erased. In future
    // make a scan of the input canvas and pull the ones that end up in the final version.

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    //   marginLeft: 180,
      marginRight: 'auto',
      padding: 20,
      marginTop: 10
    },
    palatte: {
        padding: 10
    },
    control: {
      padding: theme.spacing(2),
    },
    colors: {
        marginLeft: 10
    }
}));

const OverlappingWaveformInterface = props => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const loadedInput = useSelector(state => state.inputSelect)
    const inputCanvasRef = useRef(null)
    const outputCanvasRef = useRef(null)
    const popCanvasRef = useRef(null)
    // const [posX, setPosX] = useState(0)
    // const [posY, setPosY] = useState(0)
    const [inputId, setInputId] = useState(null)
    const [image, setImage] = useState(null)
    const [N, setN] = useState(2)
    const [symmetry, setSymmetry] = useState(1)
    const [ground, setGround] = useState(0)
    const [periodicInput, setPeriodicInput] = useState(true)
    const [periodicOutput, setPeriodicOutput] = useState(false)
    const [inputTitle, setInputTitle] = useState("")
    const [outputTitle, setOutputTitle] = useState("")

    const [anchorN, setAnchorN] = useState(null);
    const [anchorSymmetry, setAnchorSymmetry] = useState(null);
    const [anchorGround, setAnchorGround] = useState(null);
    const [anchorPeriodicInput, setAnchorPeriodicInput] = useState(null);
    const [anchorPeriodicOutput, setAnchorPeriodicOutput] = useState(null);
    const [anchorGallery, setAnchorGallery] = useState(null);

    const openN = Boolean(anchorN);
    const openSym = Boolean(anchorSymmetry);
    const openG = Boolean(anchorGround);
    const openPI = Boolean(anchorPeriodicInput);
    const openPO = Boolean(anchorPeriodicOutput);
    const openGalAlert = Boolean(anchorGallery);

    const handlePopupN = event => {
        setAnchorN(event.currentTarget)
    }
    const handlePopupSym = event => {
        setAnchorSymmetry(event.currentTarget)
    }
    const handlePopupG = event => {
        setAnchorGround(event.currentTarget)
    }
    const handlePopupPI = event => {
        setAnchorPeriodicInput(event.currentTarget)
    }
    const handlePopupPO = event => {
        setAnchorPeriodicOutput(event.currentTarget)
    }
    const handlePopupGal = (url) => {
        const galleryButton = document.getElementById('gallery')
        setAnchorGallery(galleryButton)
        setTimeout(() => {
            const popCtx = popCanvasRef.current.getContext('2d')
            const popImage = document.createElement('img')
    
            popImage.src = `http://localhost:3000${url}`
            popImage.onload = () => {
                popCtx.drawImage(popImage,0,0)
            }
        }, 70);
    }

    const handleClose = (setAnchor) => {
        setAnchor(null);
      };

    const [colorArray, _setColorArray] = useState([])
    const colorArrayRef = useRef(colorArray)

    const setColorArray = data => {
        colorArrayRef.current = data
        _setColorArray(data)
    }

    const [hex, _setHex] = useState("#FFFFFF")
    const hexRef = useRef(hex)

    const setHex = data => {
        hexRef.current = data
        _setHex(data)
    }

    const classes = useStyles();

    var img_url_to_data = function(img, callback){
        // var img = document.createElement('img')
        // img.src = URL.createObjectURL(imageFile)
        
        img.onload = function(e){
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
        handlePainting()
        if (loadedInput){
            handleInputSelect()
        }

        return () => {
            dispatch(inputSelect(null))
        }

    }, [])

    const handlePainting = () => {
        const div = document.getElementById('picker')
        const colorPicker = new iro.ColorPicker(div, {
            width: 100
        })

        const canvas = inputCanvasRef.current
        const ctx = canvas.getContext('2d')
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = hexRef.current

        colorPicker.on('color:change', (color) => {

            setHex(color.hexString)
            ctx.fillStyle = color.hexString
        });

        let drawing = false

        canvas.addEventListener('mousedown', (e) => {

            setInputId(null)
            drawing = true
            if (!colorArrayRef.current.includes(hexRef.current)){
                const newColorArray = [...colorArrayRef.current, hexRef.current]
                setColorArray(newColorArray)
            }

            const x = e.offsetX / 15 | 0
            const y = e.offsetY / 15 | 0
            ctx.fillRect( x, y, 1, 1 );
        });

        canvas.addEventListener('mouseup', e => {
            drawing = false
            console.log(drawing)
        })

        canvas.addEventListener('mouseleave', e => {
            drawing = false
        })

        canvas.addEventListener('mousemove', e => {
            if (drawing){
                const x = e.offsetX / 15 | 0
                const y = e.offsetY / 15 | 0
                ctx.fillRect( x, y, 1, 1 );
            }
        })
    }

    const handleInputSelect = () => {
        loadedInput.colors.forEach(color => setColorArray([...colorArrayRef.current, color.hex]))

    }

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
        const canvas = inputCanvasRef.current
        const image = document.createElement("img")
        image.src = canvas.toDataURL('image/png')

        img_url_to_data(image, start)
    }

    // save input image to db
    const saveInput = () => {

        const inputCanvas = document.getElementById("input")
        const inputImgUrl = inputCanvas.toDataURL("image/png");
        
        const inputFormData = new FormData();
        inputFormData.append('input_title', inputTitle)
        inputFormData.append('input', inputImgUrl)
        inputFormData.append('user_id', auth.id)
        colorArrayRef.current.forEach(color => inputFormData.append(`color${color}`, color))
        // add colors here once we are tracking them

        const inputReqObj = {
            method: "POST",
            body: inputFormData
        }

        fetch('http://localhost:3000/inputs', inputReqObj)
        .then(resp => resp.json())
        .then(data => {
            dispatch(inputCreationSuccess(data))
            setInputId(data.id)
            alert('input saved')
        })

    }
    
    //save output image to db
    const saveOutput = () => {
        if (!inputId){
            const inputFormData = new FormData();
            const inputCanvas = document.getElementById("input")
            const inputImgUrl = inputCanvas.toDataURL("image/png");
            inputFormData.append('input_title', inputTitle)
            inputFormData.append('input', inputImgUrl)
            inputFormData.append('user_id', auth.id)
            colorArrayRef.current.forEach(color => inputFormData.append(`color${color}`, color))
            // add colors here once we are tracking them

            const inputReqObj = {
                method: "POST",
                body: inputFormData
            }

            fetch('http://localhost:3000/inputs', inputReqObj)
            .then(resp => resp.json())
            .then(data => {
                dispatch(inputCreationSuccess(data))
                setInputId(data.id)

                const outputCanvas = document.getElementById("output")
                const imgUrl = outputCanvas.toDataURL("image/png");
        
                const formData = new FormData();
                formData.append('ooutput', imgUrl)
                formData.append('title', outputTitle)
                formData.append('user_id', auth.id)
                formData.append('n', N)
                formData.append('symmetry', symmetry)
                formData.append('ground', ground)
                formData.append('periodic_input', periodicInput)
                formData.append('periodic_output', periodicOutput)

                formData.append('input_id', data.id)

                const reqObj = {
                    method: "POST",
                    body: formData
                }

                fetch('http://localhost:3000/ooutputs', reqObj)
                .then(resp => resp.json())
                .then(data => {
                    dispatch(oOutputCreationSuccess(data))
                    handlePopupGal(data.ooutput.url)
                    // alert('Output and Input Saved.')
                })
            })
            } else {
                const outputCanvas = document.getElementById("output")
                const imgUrl = outputCanvas.toDataURL("image/png");
        
                const formData = new FormData();
                formData.append('ooutput', imgUrl)
                formData.append('title', outputTitle)
                formData.append('user_id', auth.id)
                formData.append('n', N)
                formData.append('symmetry', symmetry)
                formData.append('ground', ground)
                formData.append('periodic_input', periodicInput)
                formData.append('periodic_output', periodicOutput)

                formData.append('input_id', inputId)

                const reqObj = {
                    method: "POST",
                    body: formData
                }

                fetch('http://localhost:3000/ooutputs', reqObj)
                .then(resp => resp.json())
                .then(data => {
                    dispatch(oOutputCreationSuccess(data))
                    handlePopupGal(data.ooutput.url)
                    // alert('Output saved.')
                })
            }
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

    const handleColorClick = h => {
        const canvas = inputCanvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = h
        setHex(h)
    }

    return(
        <div className={classes.root} >
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={1} >
                        <Grid item>
                            <Grid direction="column" align-items="center" justify="center" container>
                                <Grid item>
                                    <canvas id="input" width="16" height="16" style={{width:"240px", height:"240px"}} ref={inputCanvasRef}></canvas>
                                </Grid>
                                <Grid container>
                                    <Grid item xs>
                                        <TextField
                                            onChange={handleInputTitle}
                                            value={inputTitle}
                                            id="outlined-basic"
                                            label="Title"
                                            variant="outlined"
                                            size="small"
                                            />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Button onClick={saveInput} variant="contained" color="secondary" >Save Input</Button>
                                    </Grid>
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
                    <Paper elevation={3}>
                        <Grid className={classes.palatte} spacing={2} container justify="flex-start" alignItems={'flex-start'} direction={'row'}>
                            <Grid item xs={1} sm={1}>
                                <FormControl>
                                    <div id="picker"></div>
                                </FormControl>
                            </Grid>
                            <Grid item xs={11} >
                                <Grid className={classes.colors}container spacing={2}>
                                    {colorArray.map(h => <Grid key={h} item><Color handleClick={handleColorClick} hex={h}/></Grid>)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <Grid className={classes.root} container direction="row" justify="space-evenly" alignItems="flex-start" spacing={1}>
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
                                    <Button onClick={handlePopupN}>?</Button>
                                    <Popover 
                                        anchorEl={anchorN}
                                        open={openN}
                                        onClose={() => handleClose(setAnchorN)}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Typography variant="subtitle1" style={{padding: 10, maxWidth: 250}}>
                                            Higher N increases the size of the detected pattern, or how far each pixel can "see" from itself.
                                        </Typography>
                                    </Popover>
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
                                    <Button onClick={handlePopupSym} >?</Button>
                                    <Popover 
                                        anchorEl={anchorSymmetry}
                                        open={openSym}
                                        onClose={() => handleClose(setAnchorSymmetry)}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Typography variant="subtitle1" style={{padding: 10, maxWidth: 250}}>
                                            Higher symmetry will increase the ways in which the generator will play with 
                                            the pattern (flipping, mirroring, etc.). 1 will mean strict adherance to the input.
                                        </Typography>
                                    </Popover>
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        onChange={handleGround}
                                        type="number"
                                        value={ground}
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
                                <Button onClick={handlePopupG}>?</Button>
                                <Popover 
                                        anchorEl={anchorGround}
                                        open={openG}
                                        onClose={() => handleClose(setAnchorGround)}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Typography variant="subtitle1" style={{padding: 10, maxWidth: 250}}>
                                            Any ground value other than zero will attempt to add a pattern from the bottom of the input. It may take some experimenting with to get it to work, but 
                                            common values are between -1 through -5, and 100 through 102.
                                        </Typography>
                                    </Popover>
                                </FormControl>
                                <Grid item>
                                    <Grid container direction="column">
                                    <FormControlLabel
                                        control={<Switch 
                                            checked={periodicInput}
                                            onChange={handlePeriodicInput}
                                            name="periodic switch"
                                            color="primary"/>}
                                        label="Periodic Input"
                                    />
                                    <Button onClick={handlePopupPI}>?</Button>
                                    <Popover 
                                        anchorEl={anchorPeriodicInput}
                                        open={openPI}
                                        onClose={() => handleClose(setAnchorPeriodicInput)}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Typography variant="subtitle1" style={{padding: 10, maxWidth: 250}}>
                                            While this is on the generator will see the input as tileable, allowing 
                                            it to exit off of an edge and enter on another.
                                        </Typography>
                                    </Popover>
                                    
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column">
                                        <FormControlLabel
                                            control={<Switch 
                                                checked={periodicOutput}
                                                onChange={handlePeriodicOutput}
                                                name="periodic switch"
                                                color="primary"/>}
                                            label="Periodic Output"
                                        />
                                        <Button onClick={handlePopupPO}>?</Button>
                                            <Popover 
                                                anchorEl={anchorPeriodicOutput}
                                                open={openPO}
                                                onClose={() => handleClose(setAnchorPeriodicOutput)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                            >
                                            <Typography variant="subtitle1" style={{padding: 10, maxWidth: 250}}>
                                                While this is on the generator will see the input as tileable with itself, which is
                                                useful for creating patterns.
                                            </Typography>
                                        </Popover>
                                        <Popover 
                                                anchorEl={anchorGallery}
                                                open={openGalAlert}
                                                onClose={() => handleClose(setAnchorGallery)}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'left',
                                                }}
                                            >
                                            <Typography variant="subtitle1" style={{padding: 10, maxWidth: 250}}>
                                                {'< You can find your new creation in the gallery'}
                                            </Typography>
                                            <Grid container style={{padding: 20}}>
                                                <canvas width="48" height="48" style={{width:"100px", height:"100px", border: '0px none black'}} ref={popCanvasRef}/>
                                            </Grid>
                                        </Popover>
                                    </Grid>
                                </Grid>
                                <input onChange={handleFile} type="file" name="audio" accept="image/*" id="upload" />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default OverlappingWaveformInterface