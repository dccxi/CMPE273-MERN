import { LOGIN, LOGOUT, REGISTER } from './types'
import axios from 'axios'
import { history } from './_history'

export const login = user => dispatch => {
  axios({
    method: 'post',
    url: '/login',
    data: user
  }).then(res => {
    const { success, token } = res.data
    if (success) {
      localStorage.setItem('token', token)
      dispatch({
        type: LOGIN,
        payload: {
          loggedInSuccess: true
        }
      })
      console.log('login success');
      history.push('/')
    } else {
      dispatch({
        type: LOGIN,
        payload: {
          loggedInSuccess: false
        }
      })
      console.log('login fail');
    }
  }).catch(console.err)
}

export const logout = () => {
  localStorage.removeItem('token')
  return {
    type: LOGOUT
  }
}

export const register = user => dispatch => {
  axios({
    method: 'post',
    url: '/register',
    data: user,
  }).then(res => {
    if (res.data.success) {
      dispatch({
        type: REGISTER,
        payload: {
          registeredSuccess: true
        }
      })
    } else {
      dispatch({
        type: REGISTER,
        payload: {
          registeredSuccess: false
        }
      })
    }
  })
}
