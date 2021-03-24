const authReducer = (state = null, action) => {
    
    switch(action.type){
        case 'LOGIN_SUCCESS':
          return {
              id: action.user.id,
              username: action.user.username
            }
        case 'LOGOUT':
            delete localStorage.token
            return null
        default: 
            return state
    }
}
    
    export default authReducer
    //   case 'CURRENT_USER':