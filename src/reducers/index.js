import { combineReducers } from 'redux'
import authReducer from './auth'

const rootReducer = combineReducers({
    auth: authReducer,
    // samples: samplesReducer,
    // sample: sampleReducer
})

export default rootReducer