import axios from 'axios'
import { history } from '../services/_history'

export const login = user => {
  axios({
    method: 'post',
    url: '/login',
    data: user
  }).then(res => {
    const { success, token } = res.data
    if (success) {
      localStorage.setItem('token', token)
      console.log('login success');
      history.push('/')
    } else {
      console.log('login fail');
    }
  }).catch(console.err)
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const register = user => {
  axios({
    method: 'post',
    url: '/register',
    data: user,
  }).then(res => {
    if (res.data.success) {
      console.log('registered');
      history.push('/')
    } else {
      console.log('not registered');
    }
  })
}
