import { Route, Switch } from 'react-router-dom';
import OverlappingWaveformInterface from './components/OverlappingWaveformInterface'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/new-overlapping-waveform' component={OverlappingWaveformInterface}/>
      </Switch>
    </div>
  );
}

export default App;
