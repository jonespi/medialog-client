import React, { Component } from 'react';
import AuthApiService from '../Service/AuthApiService';
import TokenService from '../Service/TokenService';
import './LoginForm.css'

export default class LoginForm extends Component {
  state = {
    error: null,
    formSubmitted: false
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ error: null})
    const {user_name, password} = ev.target;
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = ''
        password.value = ''

        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <section className="login_form">
        {!this.state.formSubmitted && <form onSubmit={this.handleSubmit}>
          <span>
            <h3>Username</h3>
            {this.state.error && <p>{this.state.error}</p>}
            <input name='user_name' type='text' required id='login_form__user_name' />
          </span>
          <span>
            <h3>Password</h3>
            <input name='password' type='password' required id='login_form__password' />
          </span>
          <br/>
          <button>
            Submit
          </button>
        </form>}

        {this.state.formSubmitted && <img src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif" alt="loading gif" />}
      </section>
    )
  }
}