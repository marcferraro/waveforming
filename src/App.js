import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';
import Collection from './components/Collection';
import HowTo from './components/HowTo';
import CanvasTest from './components/CanvasTest';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from './actions'


function App(props) {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  // useEffect(() => {
  //   const token = localStorage.token

  //   if (!token){
  //     props.history.push('/login')
  //   } else {

  //     const reqObj = {
  //       method: "GET",
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     }

  //     fetch('http://localhost:3000/api/v1/current_user', reqObj)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data)
  //       if (data.error){
  //         alert(data.error)
  //       } else {
  //         dispatch(loginSuccess(data))
  //       }
  //     })
  //   }
  // }, [])

  return (
    <div className="App">
      {auth ? <Navbar /> : null}
      <Switch>
        <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/canvas-test' component={CanvasTest}/>
        <Route path='/collection' component={Collection}/>
        <Route path='/how-to' component={HowTo}/>
        <Route path='/' component={Welcome}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
