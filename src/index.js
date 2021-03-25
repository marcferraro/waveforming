import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Login from './components/Login'
import SignUp from './components/SignUp'
// import reportWebVitals from './reportWebVitals';

const store = configureStore()


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
      </Switch>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
