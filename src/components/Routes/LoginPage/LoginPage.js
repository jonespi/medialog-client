import React, { Component } from 'react'
import LoginForm from '../../LoginForm/LoginForm'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { history } = this.props
    history.push('/add')
    window.location.reload()
  }

  render() {
    return (
      <section>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}
