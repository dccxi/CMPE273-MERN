import React from 'react'
import { Route, Router } from 'react-router-dom'
// import { connect } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Welcome from './components/Welcome'
import Profile from './components/Profile'
import './App.css'
import { history } from './actions/_history'

class App extends React.Component {
  render() {
    return (
      <Router history={ history }>
        <div>
          <PrivateRoute exact path='/' component={ Home } />
          <Route exact path='/login' component={ Login } />
          <Route exact path='/signup' component={ SignUp } />
          <Route exact path='/welcome' component={ Welcome } />
          <Route exact path='/profile' component={ Profile } />
        </div>
      </Router>
    );
  }
}

export default App
