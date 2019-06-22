import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../Service/TokenService'

export default function PublicRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Redirect to={'/watch_list'} />
          : <Component {...componentProps} />
      )}
    />
  )
}