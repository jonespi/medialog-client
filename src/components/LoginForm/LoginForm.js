import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import AuthApiService from '../Service/AuthApiService';
import TokenService from '../Service/TokenService';
import './LoginForm.css'

export default class LoginForm extends Component {
  state = {
    error: null,
    passwordVisibility: 'text'
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

        this.setState({ formSubmitted: true })

        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  passwordUpdate = () => {
    this.setState({
      passwordVisibility: 'password'
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <span>
            <h3>Username</h3>
            {this.state.error && <p>{this.state.error}</p>}
            <input name='user_name' type='text' required id='login_form__user_name' defaultValue='medialog' aria-label="username" />
          </span>
          <span>
            <h3>Password</h3>
            <input name='password' type={this.state.passwordVisibility} onChange={this.passwordUpdate} required id='login_form__password' defaultValue='P@ssw0rd' aria-label='password' />
          </span>
          <br/>
          <button aria-label='submit login'>
            Submit
          </button>
        </form>

        <Link to='/register'>
          <p>Don't have an account?</p>
        </Link>
      </>
    )
  }
}