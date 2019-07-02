import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TokenService from '../Service/TokenService';
import './Header.css'

class Header extends Component {
  static defaultProps = {
    openModal: () => {}
  }

  handleLogoutClick = () => {
    this.props.openModal();
  }

  renderLogoutLink() {
    return (
      <nav className='Header__logged-in'>
        <Link className="button" to='/add_media'>
          Add Media
        </Link>
        <Link className="button" to='/watch_list'>
          Watch List
        </Link>
        <Link
          className="button"
          onClick={this.handleLogoutClick}>
            Logout
        </Link>
      </nav>
    )
  }

  renderLoginLink() {
    return (
      <nav className='Header__not-logged-in'>
        <Link className="button" to='/login'>Log in</Link>
        <Link className="button" to='/register'>Register</Link>
      </nav>
    )
  }

  render() {
    return <div className="nav_container">
      <nav className='Header'>
        <div className='left-header'>
          <Link to='/' aria-label='link to home'>
            <h1>MediaLog <span role="img" aria-label="tv and film" >📺🎬</span></h1>
          </Link>
          <p className='tagline'>Whatcha watchin?</p>
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

export default withRouter(Header)