import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../Service/TokenService';
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = () => {
    if (window.confirm('Are you sure you wish to log out?')) {
      TokenService.clearAuthToken()
      window.location.reload()
    }
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
    return <div className="nav_container">
      <nav className='Header'>
        <div className='left-header'>
          <h1>
            <Link to='/'>
              MediaLog
            </Link>
          </h1>
          <span className='tagline'>Whatcha watchin?</span>
        </div>
        <div className='right-header'>
          {TokenService.hasAuthToken() 
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </nav>
    </div>
  }
}