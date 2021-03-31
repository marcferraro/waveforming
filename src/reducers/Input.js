const inputReducer = (state = [], action) => {
    
    switch(action.type){
        case 'LOGIN_SUCCESS':
          return []
        default: 
            return state
    }
}
    
    export default authReducer
    //   case 'CURRENT_USER':