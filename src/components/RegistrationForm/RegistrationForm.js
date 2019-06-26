import React, { Component } from 'react'
import AuthApiService from '../Service/AuthApiService';
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
  state = { 
    error: null,
    passwordDisplay: 'password',
    formSubmitted: false
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error: null, formSubmitted: true })
    const {user_name, password} = ev.target;
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value
    })
      .then(user => {
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error, formSubmitted: false })
      })
  }

  showPassword = () => {
    if (this.state.passwordDisplay === 'password') {
      this.setState({
        passwordDisplay: 'text'
      })
    } else {
      this.setState({
        passwordDisplay: 'password'
      })
    }
  }
  
  render() {
    return (
      <section className="registration_form">
        {!this.state.formSubmitted && <form onSubmit={this.handleSubmit}>
          <span>
            <h3>Username</h3>
            {this.state.error && <p>{this.state.error}</p>}
            <input name='user_name' type='text' required id='registration_form__user_name' />
          </span>
          <span>
            <h3>Password</h3>
            <p>Password must have a capital letter, a number, and a special character (!@#$%^&)</p>
            <input name='password'  type={this.state.passwordDisplay} required id='registration_form__password' />
            <br />
            <label><input type="checkbox" onClick={this.showPassword} />Show Password</label>
          </span>
          <br/>
          <button type="submit">
            Submit
          </button>
        </form>}

        {this.state.formSubmitted && <img src="https://media.giphy.com/media/3o7bu8sRnYpTOG1p8k/giphy.gif" alt="loading gif" />}
      </section>
    )
  }
}