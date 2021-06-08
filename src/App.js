import Navbar from './components/Navbar'
import Landing from './components/Landing'
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from './actions'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'roboto',
      'Kreon'
    ].join(','),
  },
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
      <ThemeProvider theme={theme}>
        {auth ? <Navbar /> : <Landing />}
      </ThemeProvider>
    </div>
  );
}

export default withRouter(App);
