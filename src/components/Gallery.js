import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import { useSelector } from 'react-redux'
import OOutputCard from './OOutputCard'

const Gallery = props => {

    const oOutputs = useSelector(state => state.oOutputs)

    const reverseOOutputs = () => {
        return oOutputs.slice(0).reverse()
    }


    return(
        <div >
            <Typography variant="h2" >
                Gallery
            </Typography>
            <Grid container spacing={3} direction="row" justification="center" alignItems="flex-start">
                {reverseOOutputs().map(o => <OOutputCard key={o.id} oOutput={o}/>)}
            </Grid>
        </div>
    )
}

export default Gallery