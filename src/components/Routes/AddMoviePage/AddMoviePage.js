import React, { Component } from 'react'
import MovieDBService from '../../Service/MovieDBService'
import SearchForm from '../../SearchForm/SearchForm'
import SearchResults from '../../SearchResults/SearchResults'
import './AddMoviePage.css'
import Service from '../../Service/Service';

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
          results: res.results.slice(0, 10),
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

  renderDateInput() {
    let now = new Date();
    let minDate = now.toISOString().substring(0,10);
    return <input type="date" className="form-control" id="date" name="date" onChange={this.updateDate} max={minDate} defaultValue={minDate} />
  }

  render() {
    return (
      <section className='add_movie_page'>
        <SearchForm handleSearch={this.handleSearch} />

        {this.state.isLoaded && 
          <form className='results_form' onSubmit={this.handleAdd}>
            <div className='results_form__context'>
              <label>
                <p>Recommended?</p>
                <select name="recommendation" onChange={this.updateRecommendation}>
                  <option value="recommended">recommended</option>
                  <option value="do-not-recommend">do not recommend</option>
                </select>
              </label>
              <label>
                <p>Date watched:</p>
                {this.renderDateInput()}
              </label>
              <button type="submit" disabled={!this.state.isValid}>
                Add movie
              </button>
            </div>
            <SearchResults results={this.state.results} change={this.updateMovieSelection} className='results' />
          </form>
        }
      </section>
    )
  }
}

export default AddMovie;