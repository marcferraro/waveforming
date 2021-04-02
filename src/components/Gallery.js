import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import { useSelector } from 'react-redux'
import OOutputCard from './OOutputCard'

// formatting starts to get a little wonky now that the number of elements has increased. Maybe the long titles of 
// certain cards is affecting it?
    // Confirmed, either add max title length or ... if the name goes too far

const Gallery = props => {

    const oOutputs = useSelector(state => state.oOutputs)

    const reverseOOutputs = () => {
        return oOutputs.slice(0).reverse()
    }


    return(
        <div style={{padding: 30}}>
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