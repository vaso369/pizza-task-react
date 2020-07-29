import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

// eslint-disable-next-line
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.userSignIn.userInfo)
  return (
    <Route
      {...rest} // eslint-disable-line
      // eslint-disable-next-line
      component={(props) => (isAuth !== null ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}

export default PrivateRoute
