import React, { Component } from 'react'
import MovieDBService from '../Service/MovieDBService'
import SearchResults from '../SearchResults/SearchResults'
import './AddMoviePage.css'

class AddMovie extends Component {
  state = {
    isLoaded: false,
    endpoint: 'movie',
    results: [],
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { add_search } = ev.target
      MovieDBService.getMovies(add_search.value)
      .then(res => {
        this.setState({
          results: res.results.slice(0, 5),
          isLoaded: true
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <div>
        <h3>Add Movie</h3>
        <form onSubmit={this.handleSubmit}>
          <span>
            <h3>Search</h3>
            <input name='add_search' type='text' required id='add_page___search' />
          </span>
          <br/>
          <button>
            <h2>Search</h2>
          </button>
        </form>

        {this.state.isLoaded && 
          <form className="results">
            <div>
              <SearchResults results={this.state.results} />
            </div>
            <select name="recommendation">
              <option value="recommended">recommended</option>
              <option value="do-not-recommend">do not recommend</option>
            </select>
            <input type="date" className="form-control" id="date" name="date"></input>
            <button>
              <h2>Add movie</h2>
            </button>
          </form>
        }
      </div>
    )
  }
}

export default AddMovie;