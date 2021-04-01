const oOutputReducer = (state = [], action) => {
    
    switch(action.type){
        case 'FETCH_OOUTPUTS_SUCCESS':
          return action.oOutputs
        case 'UPDATE_OOUTPUT':
            return state.map(o => o.id === action.oOutput.id ? action.oOutput : o)
        case 'LOGOUT':
            return []
        default: 
            return state
    }
}
    
    export default oOutputReducer
    //   case 'CURRENT_USER':