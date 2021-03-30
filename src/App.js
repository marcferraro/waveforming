// import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
// import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Landing from './components/Landing'
// import Welcome from './components/Welcome'
// import Login from './components/Login'
// import SignUp from './components/SignUp'
// import Profile from './components/Profile'
// import Dashboard from './components/Dashboard';
// import Gallery from './components/Gallery';
// import Collection from './components/Collection';
// import HowTo from './components/HowTo';
// import CanvasTest from './components/CanvasTest';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from './actions'


function App(props) {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const token = localStorage.token
    // debugger
    if (!token){
      // props.history.push('/login')
    } else if (token && !auth) {

      const reqObj = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      fetch('http://localhost:3000/current_user', reqObj)
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
  }, [auth])

  return (
    <div className="App">
      {/* <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route exact path='/' component={Welcome}/>
      </Switch> */}
      {auth ? <Navbar /> : <Landing />}
    </div>
  );
}

export default withRouter(App);
