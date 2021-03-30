import { Route, Switch } from 'react-router-dom';
import Welcome from './Welcome'
import Login from './Login'
import SignUp from './SignUp'
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from '../actions'


const Landing = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

//   useEffect(() => {
//     const token = localStorage.token
//     // debugger
//     if (!token){
//       props.history.push('/login')
//     } else if (token && !auth) {

//       const reqObj = {
//         method: "GET",
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }

//       fetch('http://localhost:3000/api/v1/current_user', reqObj)
//       .then(resp => resp.json())
//       .then(data => {
//         console.log(data)
//         if (data.error){
//           alert(data.error)
//         } else {
//           dispatch(loginSuccess(data))
//         }
//       })
//     }
//   }, [auth])

  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route exact path='/' component={Welcome}/>
      </Switch>
    </div>
  );
}

export default withRouter(Landing);
