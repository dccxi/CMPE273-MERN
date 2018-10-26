import { FETCH_PROFILE, UPDATE_PROFILE } from '../actions/types'

const initialState = {
  image: '',
  firstName: '',
  lastName: '',
  phone: '',
  about: '',
  city: '',
  country: '',
  school: '',
  hometown: '',
  language: '',
  gender: '',
  // isOwner: 0
}

export default function profileReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
