import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Grid, Typography} from '@material-ui/core';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

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

    return(
        // <div className={classes.root}>
            <Grid container direction="row" justify="space-around" alignItems='center' space={5}>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Typography variant="h4">Recent Creations</Typography>
                        </Grid>
                        <Grid item style={{border: '1px solid black'}}>
                            <GridList cellHeight={200} className={classes.gridList} cols={2} >
                                {oOutputs.map((o) => (
                                    <GridListTile key={o.id} cols={o.cols || 1}>
                                        <canvas className="canvas" data-url={`http://localhost:3000${o.ooutput.url}`} width="48" height="48" style={{width:"200px", height:"200px", border: '0px none black'}} alt={o.title}/>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Typography variant="h4">Recent Creations</Typography>
                        </Grid>
                        <Grid item style={{border: '1px solid black'}}>
                            <GridList cellHeight={200} className={classes.gridList} cols={2} >
                                {oOutputs.map((o) => (
                                    <GridListTile key={o.id} cols={o.cols || 1}>
                                        <canvas className="canvas" data-url={`http://localhost:3000${o.ooutput.url}`} width="48" height="48" style={{width:"200px", height:"200px", border: '0px none black'}} alt={o.title}/>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        // </div>
    )
}

export default Dashboard

// style={{marginLeft: 180, marginRight: 'auto'}}