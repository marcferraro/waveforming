import { useEffect } from 'react';

const Welcome = props => {

    useEffect(() => {
        const token = localStorage.token
    
        if (token){
          props.history.push('/dashboard')
        }}, [])


    return(
        <div style={{marginLeft: 180, marginRight: 'auto'}} >
            Hello from the welcome
        </div>
    )
}

export default Welcome