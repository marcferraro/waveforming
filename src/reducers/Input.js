const inputReducer = (state = [], action) => {
    
    switch(action.type){
        case 'FETCH_INPUTS_SUCCESS':
          return action.inputs
        case 'INPUT_CREATION_SUCCESS':
            return [...state, action.input]
        default: 
            return state
    }
}
    
    export default inputReducer