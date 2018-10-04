import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducers from './authReducers'

const middleware = [thunk]

const rootReducer = combineReducers({
  auth: authReducers
})

export const store = createStore(
  rootReducer,
  applyMiddleware(
    ...middleware
  )
)
