import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
      </Switch>
    </div>
  );
}

export default App;
