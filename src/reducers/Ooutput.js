const oOutputReducer = (state = [], action) => {
    
    switch(action.type){
        case 'FETCH_OOUTPUTS_SUCCESS':
            // console.log('wired')
            // debugger
          return [...state, action.oOutputs]
        case 'LOGOUT':
            return []
        default: 
            return state
    }
}
    
    export default oOutputReducer
    //   case 'CURRENT_USER':