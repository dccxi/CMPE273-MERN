import {
  LOGIN,
  LOGOUT,
  REGISTER,
  FETCH_PROFILE,
  UPDATE_PROFILE,
  FETCHED_SEARCH,
  SET_DATE_RANGE
} from './types'
import axios from 'axios'
import { history } from '../services/_history'
import _ from 'lodash'
import uuid from 'uuidv4'

export const login = user => dispatch => {
  axios({
    method: 'post',
    url: '/user/login',
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
      alert('Wrong email or password')
      console.log('Wrong email or password');
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
    url: '/user/register',
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
    url: '/user/profile',
    headers: {
      Authorization: token
    }
  }).then(res => {
    dispatch({
      type: FETCH_PROFILE,
      payload: res.data
    })
  }).catch((err) => console.log(err))
}

export const updateProfile = userProfile => dispatch => {
  const token = localStorage.getItem('token')
  axios({
    method: 'put',
    url: '/user/update',
    headers: {
      Authorization: token,
    },
    data: userProfile
  }).then(res => {
    if (res.data.success) {
      dispatch({
        type: UPDATE_PROFILE,
        payload: userProfile
      })
      alert('Profile updated')
      console.log('updated')
      history.push('/')
    } else {
      console.log('not success')
    }
  }).catch(err => console.log(err))
}

export const postProperty = property => {
  const token = localStorage.getItem('token')
  const propertyId = uuid()
  _.assign(property, { propertyId })
  const data = _.omit(property, ['photos'])
  const images = _.pick(property, ['photos'])
  const imgur = 'Client-ID 0abc0da2b5eecc3'
  let photos = []
  Promise.all(images.photos.map(async (image) => {
    let formData = new FormData()
    formData.append('image', image)
    await axios.post('https://api.imgur.com/3/upload',
      formData, { headers: { Authorization: imgur } })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          console.log(res.data);
          photos.push(res.data.data.link)
        }
      })
  })).then(() => {
    console.log(photos);
    _.assign(data, { photos })
    console.log(data);
    axios({
      method: 'post',
      url: '/property',
      headers: {
        Authorization: token,
      },
      data
    }).then(res => {
      if (res.data.success) {
        alert('Property posted')
        console.log('Property Posted')
        history.push('/')
      } else {
        console.log('not success')
      }
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}

export const search = input => dispatch => {
  const token = localStorage.getItem('token')
  axios({
    method: 'post',
    url: '/property/search',
    headers: {
      Authorization: token,
    },
    data: input
  }).then(res => {
    if (res.data.noMatch)
      console.log('no match')
    dispatch({
      type: SET_DATE_RANGE,
      payload: _.pick(input, ['startDate', 'endDate'])
    })
    dispatch({
      type: FETCHED_SEARCH,
      payload: res.data.map(u => _.omit(u, ['_id', '__v']))
    })
    history.push('/results')
  }).catch(err => console.log(err))
}
