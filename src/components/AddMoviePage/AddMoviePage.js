import React, { Component } from 'react'

export default class AddMovie extends Component {
  render() {
    return (
      <div>
        <h3>Add Movie</h3>
        <form>
          <span>
            <h3>Search</h3>
            <input name='user_name' type='text' required id='login_form__user_name' />
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