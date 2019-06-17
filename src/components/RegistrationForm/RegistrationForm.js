import React, { Component } from 'react'
import AuthApiService from '../Service/AuthApiService';

export default class RegistrationForm extends Component {
  state = { 
    error: null,
    passwordMatch: false 
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ error: null })
    const {user_name, password} = ev.target;
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value
    })
      .then(user => {
        user_name.value = ''
        password.value = ''
        this.props.handleRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  
  render() {
    return (
      <section className="registration_form">
        <form onSubmit={this.handleSubmit}>
          <span>
            <h3>Username</h3>
            {this.state.error && <p>{this.state.error}</p>}
            <input name='user_name' type='text' required id='registration_form__user_name' />
          </span>
          <span>
            <h3>Password</h3>
            <input name='password' type='password' required id='registration_form__password' />
          </span>
          <br/>
          <button type="submit">
            <h2>Submit</h2>
          </button>
        </form>
      </section>
    )
  }
}