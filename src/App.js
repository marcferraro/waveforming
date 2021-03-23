import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { loginSuccess } from './actions'


function App(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.token

    if (!token){
      props.history.push('/login')
    } else {

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
      <Navbar />
      <Switch>
        <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
        <Route path='/login' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
