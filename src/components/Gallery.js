import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import { useSelector } from 'react-redux'
import OOutputCard from './OOutputCard'
import {useState, useEffect} from 'react'

// formatting starts to get a little wonky now that the number of elements has increased. Maybe the long titles of 
// certain cards is affecting it?
    // Confirmed, either add max title length or ... if the name goes too far
    // for now reducing gallery padding from 30 -> 20

const Gallery = props => {

    const oOutputs = useSelector(state => state.oOutputs)
    const [query, setQuery] = useState('')

    useEffect(() => {
        console.log('hello')
    }, [query])

    const reverseOOutputs = () => {
        return oOutputs.slice(0).reverse()
    }

    const handleSearch = event => {
        setQuery(event.target.value)
    }


    return(
        <Grid style={{padding: 20}} container spacing={2}>
            <Grid item>
                <Typography variant="h2" >
                    Gallery
                </Typography>
                <TextField label="Search" onChange={handleSearch} value={query}/>
            </Grid>
            <Grid item>
                <Grid container spacing={3} direction="row" justification="center" alignItems="flex-start">
                    {reverseOOutputs().map(o => <OOutputCard key={o.id} oOutput={o}/>)}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Gallery