import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'


function App(props) {

  useEffect(() => {
    if (!localStorage.token){
      props.history.push('/login')
    } else {
      fetch('http://localhost:3000/api/v1/current_user')
      .then(resp => resp.json())
      .then(data => console.log(data))
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
