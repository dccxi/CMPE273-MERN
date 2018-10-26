import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ({ component: COMPONENT, ...rest }) {
  return (
    <Route { ...rest } render={
      props => localStorage.getItem('token') ?
        <COMPONENT { ...Object.assign(props, rest) } />
        : <Redirect
          to={ {
            pathname: "/login",
            state: { from: props.location }
          } }
        />
    } />
  )
}
