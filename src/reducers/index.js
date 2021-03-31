import { combineReducers } from 'redux'
import authReducer from './auth'
import oOutputReducer from './Ooutput'

const rootReducer = combineReducers({
    auth: authReducer,
    oOutputs: oOutputReducer,
    // sample: sampleReducer
})

export default rootReducer