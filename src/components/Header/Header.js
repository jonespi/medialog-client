import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../Service/TokenService';
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = (e) => {
    if (window.confirm('Are you sure you want to log out?')) {
      TokenService.clearAuthToken()
      // component is consistent in App. Needs to reload when log out is confirmed
      this.forceUpdate();
    }
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link className="button" to='/add_media'>
          Add Media
        </Link>
        <Link className="button" to='/watch_list'>
          Watch List
        </Link>
        <Link
          className="button"
          onClick={this.handleLogoutClick}
          to='/'>
            Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link className="button" to='/login'>Log in</Link>
        <Link className="button" to='/register'>Register</Link>
      </div>
    )
  }

  render() {
    return <div className="nav_container">
      <nav className='Header'>
        <div className='left-header'>
          <Link to='/'>
            <h1>MEDIALog <span role="img" aria-label="tv and film" >📺🎬</span></h1>
          </Link>
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