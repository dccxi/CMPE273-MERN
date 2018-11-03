import { FETCHED_SEARCH } from '../actions/types'

const initialState = []

export default function propertyReducers(state = initialState, action) {
  switch (action.type) {
    case FETCHED_SEARCH:
      return action.payload
    default:
      return state
  }
}
