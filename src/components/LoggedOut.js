import { Route, Switch } from 'react-router-dom';
import Welcome from './Welcome'
import Navbar from './Navbar'
import Login from './Login'
import SignUp from './SignUp'
import HowTo from './HowTo';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from '../actions'


const LoggedOut = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const token = localStorage.token

    if (token){

      const reqObj = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      fetch('http://localhost:3000/api/v1/current_user', reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        if (data.error){
          alert(data.error)
        } else {
          dispatch(loginSuccess(data))
        }
      })
    }
  }, [])

  return (
    <div className="App">
      {auth ? <Navbar /> : null}
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route path='/how-to' component={HowTo}/>
        <Route exact path='/' component={Welcome}/>
      </Switch>
    </div>
  );
}

export default withRouter(LoggedOut);
