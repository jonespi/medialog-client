import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Login} from '../Utils/Utils'
import AuthApiService from '../Service/AuthApiService';
import TokenService from '../Service/TokenService';

export default class DemoLoginForm extends Component {
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
        <Login
          handleSubmit={this.handleSubmit}
          error={this.state.error}
          passwordVisibility={this.state.passwordVisibility}
          passwordUpdate={this.passwordUpdate}
          defaultUsername={'medialog'}
          defaultPassword={'P@ssw0rd'} />
        <Link to='/register'>
          <p>Don't have an account?</p>
        </Link>
      </>
    )
  }
}