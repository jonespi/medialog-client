import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends Component {
  render() {
    return <>
     <h1>MediaLog</h1>
     <p>MediaLog is your movie diary. Track the movies that you have watched most recently so you can follow what you're watching!</p>
     <Link to={'/register'}>
       <button>Register</button>
    </Link>
    <Link to={'/login'}>
      <button>Login</button>
    </Link>
    </>
  }
}