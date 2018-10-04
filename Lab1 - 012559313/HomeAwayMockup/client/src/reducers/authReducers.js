import { LOGIN, LOGOUT, REGISTER } from '../actions/types'

const initialState = {
  registerdSuccess: false,
  loggedInSuccess: false
}

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return {}
    case REGISTER:
      return {
        ...state,
        ...action.payload
      }
    default: return state
  }
}
