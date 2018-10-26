import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducers from './authReducers'
import profileReducers from './profileReducers'
import propertyReducers from './propertyReducer'

const middleware = [thunk]

const rootReducer = combineReducers({
  auth: authReducers,
  profile: profileReducers,
  property: propertyReducers
})

export const store = createStore(
  rootReducer,
  applyMiddleware(
    ...middleware
  )
)
