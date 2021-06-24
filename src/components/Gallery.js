import { Grid, TextField, Select, MenuItem, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import OOutputCard from './OOutputCard'
import InputCard from './InputCard'
import {useState} from 'react'

// formatting starts to get a little wonky now that the number of elements has increased. Maybe the long titles of 
// certain cards is affecting it?
    // Confirmed, either add max title length or ... if the name goes too far
    // for now reducing gallery padding from 30 -> 20

const Gallery = props => {

    const oOutputs = useSelector(state => state.oOutputs)
    const inputs = useSelector(state => state.inputs)
    const [type, setType] = useState('oOutputs')
    const [query, setQuery] = useState('')
    const [filterCategory, setFilterCategory] = useState('title')

    const contentHandler = () => {
        let content
        if (type === 'oOutputs'){
            content = oOutputs
        } else if (type === 'inputs'){
            content = inputs
        }

        if(query){
            if(filterCategory === 'title'){
                content = content.filter(o => {
                    if(o.title.toLowerCase().includes(query.toLowerCase())){
                        return o
                    }
                    return null
                })
            } else if (filterCategory === 'artist'){
                content = content.filter(o => {
                    if(o.user.username.toLowerCase().includes(query.toLowerCase())){
                        return o
                    }
                    return null
                })
            }
        }
        
        return content.slice(0).reverse()
    }

    const handleSearch = event => {
        setQuery(event.target.value)
    }

    const handleFilterCategory = event => {
        setFilterCategory(event.target.value)
    }

    const handleType = event => {
        setType(event.target.value)
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
                        value={filterCategory}
                        onChange={handleFilterCategory}
                        style={{marginLeft: 10}}
                    >
                        <MenuItem value={"title"}>Title</MenuItem>
                        <MenuItem value={"artist"}>Artist</MenuItem>
                    </Select>
                    <Select
                        value={type}
                        onChange={handleType}
                        style={{marginLeft: 10}}
                    >
                        <MenuItem value={"oOutputs"}>Outputs</MenuItem>
                        <MenuItem value={"inputs"}>Inputs</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={3} direction="row" justification="center" alignItems="flex-start">
                    {contentHandler().map(creation => {
                        if(type === 'oOutputs'){
                            return <OOutputCard key={creation.id} oOutput={creation}/>
                        } else if (type === 'inputs'){
                            return <InputCard key={creation.id} input={creation}/>
                        }
                    
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Gallery