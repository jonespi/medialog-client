import React, { Component } from 'react'
import MovieDBService from '../../Service/MovieDBService'
import SearchForm from '../../SearchForm/SearchForm'
import AddMovieForm from '../../AddMovieForm/AddMovieForm'
import './AddMoviePage.css'
import Service from '../../Service/Service';

class AddMovie extends Component {
  state = {
    isLoaded: false,
    isValid: false,
    endpoint: 'movie',
    results: [],
    movie: {},
    date: this.getDate(),
    recommendation: 'recommend'
  }

  getDate() {
    let now = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    let minDate = now.substring(0,9).split('/')
    if (minDate[0].length > 1) {
      return [minDate[2], minDate[0], minDate[1]].join('-');  
    } else {
      return [minDate[2], `0${minDate[0]}`, minDate[1]].join('-');
    }
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
      media_type: 'movie',
      title: this.state.movie.title,
      image: this.state.movie.image,
      url: this.state.movie.url,
      date_watched: this.state.date,
      recommendation: this.state.recommendation
    }
    console.log(movie)
    Service.AddMedia(movie);
    setTimeout(() => {
      this.props.history.push('/watch_list/')
    }, 500) 
  }

  renderDateInput(minDate) {
    return <input type="date" className="form-control" id="date" name="date" onChange={this.updateDate} max={minDate} defaultValue={minDate} />
  }

  render() {
    return (
      <section className='add_movie_page'>
        <h3>Add Movie</h3>
        <SearchForm handleSearch={this.handleSearch} />

        {this.state.isLoaded && 
          <AddMovieForm 
            handleAdd={this.handleAdd}
            updateRecommendation={this.updateRecommendation}
            renderDateInput={this.renderDateInput}
            getDate={this.getDate}
            isValid={this.state.isValid}
            results={this.state.results}
            updateMovieSelection={this.updateMovieSelection}
             />
        }
      </section>
    )
  }
}

export default AddMovie;