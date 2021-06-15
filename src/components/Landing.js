import { Route, Switch } from 'react-router-dom';
import Welcome from './Welcome'
import Login from './Login'
import SignUp from './SignUp'
import { withRouter } from 'react-router-dom'

const Landing = props => {

  return (
    // <div className="App">
    <>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route exact path='/' component={Welcome}/>
      </Switch>
      </>
    // {/* </div> */}
  );
}

export default withRouter(Landing);
