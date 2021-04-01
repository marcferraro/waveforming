import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
      height: 400,
    },
  }));

const Dashboard = props => {
    const classes = useStyles();
    const oOutputs = useSelector(state => state.oOutputs)

    useEffect(() => {
        console.log('use effect')
    }, [])

    return(
        <div className={classes.root}>
            <GridList cellHeight={200} className={classes.gridList} cols={2}>
                {oOutputs.map((o) => (
                    <GridListTile key={o.id} cols={o.cols || 1}>
                        {/* <img src={`http://localhost:3000${o.ooutput.url}`} alt={o.title} /> */}
                        {/* {const canvaref = 5} */}
                        <canvas width="16" height="16" style={{width:"200px", height:"200px", border: '0px none black'}} />
                    </GridListTile>
                ))}
        </GridList>
        </div>
    )
}

export default Dashboard

// style={{marginLeft: 180, marginRight: 'auto'}}