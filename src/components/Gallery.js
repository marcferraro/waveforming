import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Select, MenuItem } from '@material-ui/core'
import { useSelector } from 'react-redux'
import OOutputCard from './OOutputCard'
import {useState} from 'react'

// formatting starts to get a little wonky now that the number of elements has increased. Maybe the long titles of 
// certain cards is affecting it?
    // Confirmed, either add max title length or ... if the name goes too far
    // for now reducing gallery padding from 30 -> 20

const Gallery = props => {

    const oOutputs = useSelector(state => state.oOutputs)
    const [query, setQuery] = useState('')

    const reverseOOutputs = () => {
        let filteredOOutputs = oOutputs

        if(query){
            filteredOOutputs = filteredOOutputs.filter(o => {
                if(o.title.toLowerCase().includes(query.toLowerCase())){
                    return o
                }
                return null
            })
        }
        
        return filteredOOutputs.slice(0).reverse()
    }

    const handleSearch = event => {
        setQuery(event.target.value)
    }

    return(
        <Grid style={{padding: 20}} container spacing={2} direction="column">
            <Grid item>
                <Typography variant="h2" >
                    Gallery
                </Typography>
                <Grid container direction="row" justify="flex-start" >
                    <TextField label="Search" onChange={handleSearch} value={query}/>
                    <Select
                        value={'2'}
                        // onChange={''}
                        style={{marginLeft: 10}}
                    >
                        <MenuItem value={1}>Title</MenuItem>
                        <MenuItem value={2}>Artist</MenuItem>
                    </Select>
                </Grid>
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