import { combineReducers } from 'redux'
import authReducer from './auth'
import oOutputReducer from './Ooutput'
import inputReducer from './Input'
import inputSelectReducer from './InputSelect'

const rootReducer = combineReducers({
    auth: authReducer,
    oOutputs: oOutputReducer,
    inputs: inputReducer,
    inputSelect: inputSelectReducer
})

export default rootReducer