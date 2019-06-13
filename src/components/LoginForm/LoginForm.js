import React, { Component } from 'react';
import AuthApiService from '../Service/AuthApiService';
import TokenService from '../Service/TokenService';

export default class LoginForm extends Component {
  state = {
    error: null,
  }

  handleSubmit = ev => {
    ev.preventDefault();
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
        this.setState({ error: res.error})
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <span>
            <h3>Username</h3>
            <input name='user_name' type='text' required id='login_form__user_name' />
          </span>
          <span>
            <h3>Password</h3>
            <input name='password' type='password' required id='login_form__password' />
          </span>
          <br/>
          <button>
            <h2>Submit</h2>
          </button>
        </form>
      </div>
    )
  }
}