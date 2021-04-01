import { combineReducers } from 'redux'
import authReducer from './auth'
import oOutputReducer from './Ooutput'
import inputReducer from './Input'

const rootReducer = combineReducers({
    auth: authReducer,
    oOutputs: oOutputReducer,
    inputs: inputReducer
})

export default rootReducer