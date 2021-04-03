const inputSelectReducer = (state = null, action) => {
    
    switch(action.type){
        case 'INPUT_SELECT':
            return action.input
        default: 
            return state
    }
}
    
    export default inputSelectReducer