import React from 'react'
import { Route, Router } from 'react-router-dom'
// import { connect } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Welcome from './components/Welcome'
import Profile from './components/Profile'
import ListProperty from './components/ListProperty'
import SearchResults from './components/SearchResults'
import DetailView from './components/DetailView'
import TravelerDash from './components/TravelerDash'
import OwnerDash from './components/OwnerDash'

import './App.css'
import { history } from './services/_history'

class App extends React.Component {
  render() {
    return (
      <Router history={ history }>
        <div>
          <PrivateRoute exact path='/' component={ Home } />
          <Route exact path='/login' component={ Login } />
          <Route exact path='/signup' component={ SignUp } />
          <Route exact path='/welcome' component={ Welcome } />
          <PrivateRoute exact path='/profile' component={ Profile } />
          <PrivateRoute path='/list' component={ ListProperty } />
          <PrivateRoute path='/results' component={ SearchResults } />
          <PrivateRoute path='/detail/:id' component={ DetailView } />
          <PrivateRoute path='/dashboard' component={ TravelerDash } />
          <PrivateRoute path='/ownerdash' component={ OwnerDash } />
        </div>
      </Router>
    );
  }
}

export default App
