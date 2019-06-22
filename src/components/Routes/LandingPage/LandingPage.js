import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
    return (
      <section className="landing_page">
        <h1>MediaLog</h1>
        <p>MediaLog is your movie diary. Track the movies that you have watched most recently so you can log what you're watching!</p>
        <p>Default login:</p>
        <p>username - medialog</p>
        <p>pw - P@ssw0rd</p>
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