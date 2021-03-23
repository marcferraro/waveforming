import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Dashboard from './components/Dashboard';


function App() {
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

export default App;
