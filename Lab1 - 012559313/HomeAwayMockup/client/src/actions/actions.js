import {
  LOGIN,
  LOGOUT,
  REGISTER,
  FETCH_PROFILE,
  UPDATE_PROFILE,
  FETCHED_SEARCH
} from './types'
import axios from 'axios'
import { history } from '../services/_history'
import _ from 'lodash'
import uuid from 'uuidv4'

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

export const getProfile = () => dispatch => {
  const token = localStorage.getItem('token')
  axios({
    method: 'get',
    url: '/profile',
    headers: {
      Authorization: token,
    }
  }).then(res => {
    dispatch({
      type: FETCH_PROFILE,
      payload: res.data
    })
  })
}

export const updateProfile = userProfile => dispatch => {
  const token = localStorage.getItem('token')
  axios({
    method: 'post',
    url: '/updateProfile',
    headers: {
      Authorization: token,
    },
    data: userProfile
  }).then(res => {
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: UPDATE_PROFILE,
        payload: userProfile
      })
      console.log('updated');
      history.push('/')
    } else {
      console.log('not success');
    }
  }).catch(err => console.log(err))
}

export const postProperty = property => {
  const token = localStorage.getItem('token')
  const propertyId = uuid()
  _.assign(property, { propertyId })
  const data = _.omit(property, ['photos'])
  const images = _.pick(property, ['photos'])
  axios({
    method: 'post',
    url: '/postProperty',
    headers: {
      Authorization: token,
    },
    data
  }).then(res => {
    if (res.data.success) {
      console.log(images.photos);
      console.log(typeof images.photos);
      console.log(images.photos.length);
      for (const image of images.photos) {
        let formData = new FormData()
        formData.append('propertyId', propertyId)
        formData.append('photo', image)
        axios({
          method: 'post',
          url: '/postImage',
          headers: {
            Authorization: token,
          },
          data: formData
        }).then(res => {
          if (res.data.success) {
            console.log('Property Posted');
          } else
            console.log('not success');
        }).catch(err => console.log(err))
      }
    } else {
      console.log('not success');
    }
  }).catch(err => console.log(err))
}

export const search = input => dispatch => {
  const token = localStorage.getItem('token')
  axios({
    method: 'post',
    url: '/search',
    headers: {
      Authorization: token,
    },
    data: input
  }).then(res => {
    if (res.data.noMatch)
      console.log('no match')
    console.log(res.data);
    dispatch({
      type: FETCHED_SEARCH,
      payload: res.data
    })
    history.push('/results')
  }).catch(err => console.log(err))
}
