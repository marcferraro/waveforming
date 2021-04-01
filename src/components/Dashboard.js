import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Grid, Typography} from '@material-ui/core';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: 20
    },
    gridList: {
      width: 400,
      height: 410,
      padding: 10
    },
  }));

const Dashboard = props => {
    const classes = useStyles();
    const oOutputs = useSelector(state => state.oOutputs)

    const reverseOOutputs = () => {
        return oOutputs.slice(0).reverse().slice(0, 10)
    }

    const mostPopularOOutputs = () => {
        let array
        array = oOutputs.slice(0).sort((a,b) => b.stars.length - a.stars.length)
        return array.slice(0, 10)
    }

    useEffect(() => {
        if (oOutputs[0]){
            const htmlCollection = document.getElementsByClassName('canvas')
            const array = Array.from(htmlCollection);

            array.forEach(canvas => prepCanvas(canvas))
        }
    }, [oOutputs])

    const prepCanvas = (canvas) => {
        const ctx = canvas.getContext('2d')
        const image = document.createElement('img')
        image.src = canvas.dataset.url
        image.onload = () => {
            ctx.drawImage(image,0,0)
        }
    }

    const handleCanvasClick = (event) => {
        setTimeout(() => props.history.push(`/oOutput/${event.target.dataset.id}`), 50)
    }

    const handleMouseHover = (event) => {
        event.target.style.opacity="80%"
    }
    
    const handleMouseLeave = (event) => {
        event.target.style.opacity="100%"
    }

    return(
            <Grid className={classes.root} container direction="row" justify="space-around" alignItems='center' space={5}>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Typography variant="h4">Recent Creations</Typography>
                        </Grid>
                        <Grid item style={{border: '1px solid black'}}>
                            <GridList cellHeight={200} className={classes.gridList} cols={2} >
                                {reverseOOutputs().map((o) => (
                                    <GridListTile key={o.id} cols={o.cols || 1}>
                                        <canvas onClick={handleCanvasClick} onMouseOver={handleMouseHover} onMouseLeave={handleMouseLeave} className="canvas" data-url={`http://localhost:3000${o.ooutput.url}`} data-id={o.id} width="48" height="48" style={{width:"200px", height:"200px", border: '0px none black'}} alt={o.title}/>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Typography variant="h4">Most Popular</Typography>
                        </Grid>
                        <Grid item style={{border: '1px solid black'}}>
                            <GridList cellHeight={200} className={classes.gridList} cols={2} >
                                {mostPopularOOutputs().map((o) => (
                                    <GridListTile key={o.id} cols={o.cols || 1}>
                                        <canvas onClick={handleCanvasClick} onMouseOver={handleMouseHover} onMouseLeave={handleMouseLeave} className="canvas" data-url={`http://localhost:3000${o.ooutput.url}`} data-id={o.id} width="48" height="48" style={{width:"200px", height:"200px", border: '0px none black'}} alt={o.title}/>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
    )
}

export default withRouter(Dashboard)

// style={{marginLeft: 180, marginRight: 'auto'}}