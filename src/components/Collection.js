import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import OOutputCard from './OOutputCard'
import {useState} from 'react'

const Collection = props => {

    const oOutputs = useSelector(state => state.oOutputs)
    const auth = useSelector(state => state.auth)
    const [query, setQuery] = useState('')
    const [filterCategory, setFilterCategory] = useState('title')

    const filteredOOutputs = () => {
        let filteredOOutputs = oOutputs

        filteredOOutputs = filteredOOutputs.filter(o => {
            if (o.stars){
                return o.stars.find(s => {
                    if (s.user_id === auth.id){
                        return o
                    }
                    return null
                })
            }
            return null
        })

        if(query){
            if(filterCategory === 'title'){
                filteredOOutputs = filteredOOutputs.filter(o => {
                    if(o.title.toLowerCase().includes(query.toLowerCase())){
                        return o
                    }
                    return null
                })
            } else if (filterCategory === 'artist'){
                filteredOOutputs = filteredOOutputs.filter(o => {
                    if(o.user.username.toLowerCase().includes(query.toLowerCase())){
                        return o
                    }
                    return null
                })
            }
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
                    Collection
                </Typography>
                <TextField label="Search" onChange={handleSearch} value={query}/>
            </Grid>
            <Grid item>
                <Grid container spacing={3} direction="row" justification="center" alignItems="flex-start">
                    {filteredOOutputs().map(o => <OOutputCard key={o.id} oOutput={o}/>)}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Collection