import React, { Component } from 'react'
import DemoLoginForm from '../../DemoLoginForm/DemoLoginForm'


export default class DemoLoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { history } = this.props
    history.push('/add_media')
    window.location.reload()
  }

  render() {
    return (
      <section className="login_page">
        <h2>Login</h2>
        <DemoLoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}
