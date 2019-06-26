import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
    return (
      <section className="landing_page">
        <h1><span role="img" aria-label="tv">📺</span> MEDIALog <span role="img" aria-label="film">🎬</span></h1>
        <p>MediaLog is your media diary. Track the movies and tv shows that you're currently watching!</p>
        <p>Default login:</p>
        <p>username - medialog</p>
        <p>pw - P@ssw0rd</p>
        <div className="landing_page_buttons">
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
          <Link to={'/register'}>
            <button>Register</button>
          </Link>
        </div>
      </section>
    )
  }