import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../Service/TokenService';

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    window.location.reload()
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link to='/add'>
          <button>Add</button>
        </Link>
        <Link to='/watch_list'>
          <button>Watch List</button>
        </Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          <button>Logout</button>
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          <button>Log in</button>
        </Link>
        <Link
          to='/register'>
          <button>Register</button>
        </Link>
      </div>
    )
  }

  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            MediaLog
          </Link>
        </h1>
        <span className='tagline'>Whatcha watchin?</span>
        {TokenService.hasAuthToken() 
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}