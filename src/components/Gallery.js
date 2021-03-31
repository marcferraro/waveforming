import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux'

const Gallery = props => {

    const oOutputs = useSelector(state => state.oOutputs)

    return(
        <div >
            <Typography variant="h2" >
                Gallery
            </Typography>
            <Grid container>
                {oOutputs.map(o => <p key={o.id}>o.title</p>)}
            </Grid>
        </div>
    )
}

export default Gallery