const inputReducer = (state = [], action) => {
    
    switch(action.type){
        case 'LOGIN_SUCCESS':
          return []
        case 'INPUT_CREATION_SUCCESS':
            return [...state, action.input]
        default: 
            return state
    }
}
    
    export default inputReducer