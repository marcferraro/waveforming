import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import OOutputCard from './OOutputCard'

const Collection = props => {

    const oOutputs = useSelector(state => state.oOutputs)
    const auth = useSelector(state => state.auth)

    const reverseOOutputs = () => {
        return oOutputs.slice(0).reverse()
    }

    const filteredOOutputs = () => {
        return reverseOOutputs().filter(o => {
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
    }


    return(
        <div style={{padding: 20}}>
            <Typography variant="h2" >
                Collection
            </Typography>
            <Grid container spacing={3} direction="row" justification="center" alignItems="flex-start">
                {filteredOOutputs().map(o => <OOutputCard key={o.id} oOutput={o}/>)}
            </Grid>
        </div>
    )
}

export default Collection