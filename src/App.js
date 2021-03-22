import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Navbar from './components/Navbar'
import Login from './components/Login'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
