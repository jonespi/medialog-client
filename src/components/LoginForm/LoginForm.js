import React, { Component } from 'react'

export default class LoginForm extends Component {
  render() {
    return (
      <div>
        <form>
          <span>
            <h3>Username</h3>
            <input name='user_name' type='text' required id='login_form__user_name' />
          </span>
          <span>
            <h3>Password</h3>
            <input name='password' type='text' required id='login_form__password' />
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