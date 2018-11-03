import { SET_DATE_RANGE } from '../actions/types'

const initialState = []

export default function dateReducers(state = initialState, action) {
  switch (action.type) {
    case SET_DATE_RANGE:
      return action.payload
    default:
      return state
  }
}
