import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            MediaLog
          </Link>
        </h1>
        <span className='tagline'>Whatcha watchin?</span>
        <Link to='/register'>
          <button>Register</button>
        </Link>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <Link to='/add'>
          <button>Add</button>
        </Link>
      </nav>
    </>
  }
}