// import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
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
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  // typography: {
  //   fontFamily: [
  //     'Kreon'
  //   ].join(','),
  // },
});


const App = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const token = localStorage.token
    
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
        if (data.error){
          alert(data.error)
        } else {
          dispatch(loginSuccess(data))
        }
      })
    }
  })

  return (
    <div className="app" style={{backgroundColor: "#f8f8ff"}}>
      {/* <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
        <Route exact path='/' component={Welcome}/>
      </Switch> */}
      <ThemeProvider theme={theme}>

      {auth ? <Navbar /> : <Landing />}
      </ThemeProvider>
    </div>
  );
}

export default withRouter(App);
