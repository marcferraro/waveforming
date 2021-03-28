import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
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
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
        <Route path='/gallery' component={Gallery}/>
        <Route path='/collection' component={Collection}/>
        <Route path='/how-to' component={HowTo}/>
        <Route path='/canvas-test' component={CanvasTest}/>
        <Route exact path='/' component={Welcome}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
