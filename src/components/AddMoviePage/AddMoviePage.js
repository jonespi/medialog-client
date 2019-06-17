import React, { Component } from 'react'
import MovieDBService from '../Service/MovieDBService'
import SearchResults from '../SearchResults/SearchResults'
import './AddMoviePage.css'
import Service from '../Service/Service';

class AddMovie extends Component {
  state = {
    isLoaded: false,
    isValid: false,
    endpoint: 'movie',
    results: [],
    movie: {},
    date: '',
    recommendation: 'recommend'
  }

  handleSearch = ev => {
    ev.preventDefault()
    const { add_search } = ev.target
      MovieDBService.getMovies(add_search.value)
      .then(res => {
        this.setState({
          results: res.results.slice(0, 8),
          isLoaded: true
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  updateMovieSelection = (movie) => {
    this.setState({
      movie: JSON.parse(movie)
    }, this.validateSubmit)
  }

  updateRecommendation = (e) => {
    this.setState({
      recommend: e.target.value 
    }, this.validateSubmit)
  }

  updateDate = (e) => {
    this.setState({
      date: e.target.value 
    }, this.validateSubmit)
  }

  validateSubmit = (name) => {
    if (this.state.movieTitle !== '' && this.state.date !== '' && this.state.recommend !== '') {
      this.setState({
        isValid: true
      })
    }
  }

  handleAdd = (e) => {
    e.preventDefault()
    const movie = {
      title: this.state.movie.title,
      image: this.state.movie.image,
      url: this.state.movie.url,
      date_watched: this.state.date,
      recommendation: this.state.recommendation
    }
    Service.AddMovie(movie);
    setTimeout(() => {
      this.props.history.push('/watch_list/')
    }, 500) 
  }

  render() {
    return (
      <section className='add_movie_page'>
        <h3>Add Movie</h3>
        <form onSubmit={this.handleSearch}>
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
          <form className='results-form' onSubmit={this.handleAdd}>
            <select name="recommendation" onChange={this.updateRecommendation}>
              <option value="recommended">recommended</option>
              <option value="do-not-recommend">do not recommend</option>
            </select>
            <input type="date" className="form-control" id="date" name="date" onChange={this.updateDate}></input>
            <SearchResults results={this.state.results} change={this.updateMovieSelection} className='results' />
            <button type="submit" disabled={!this.state.isValid}>
              <h2>Add movie</h2>
            </button>
          </form>
        }
      </section>
    )
  }
}

export default AddMovie;