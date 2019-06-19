import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends Component {
  render() {
    return (
      <section className="landing_page">
        <h1>MediaLog</h1>
        <p>MediaLog is your movie diary. Track the movies that you have watched most recently so you can log what you're watching!</p>
        <div className="landing_page_buttons">
          <Link to={'/register'}>
            <button>Register</button>
          </Link>
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
        </div>
      </section>
    )
  }
}