import React, { Component } from 'react'
import Service from '../../Service/Service'
import WatchedMovie from '../../WatchedMovie/WatchedMovie';
import './WatchedPage.css'

export default class WatchedList extends Component {
  state = {
    isLoaded: false,
    results: [],
  }

  componentDidMount() {
    this.getMovies()
  }

  deleteMovie = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      this.setState({
        isLoaded: false,
      })
      Service.deleteMovie(id)
      .then(() => {
        this.getMovies()
      })
    }
  }

  getMovies = () => {
    Service.getWatchList()
      .then(res => {
        this.setState({
          results: res
        })
      })
      .then(() => {
        this.setState({
          isLoaded: true
        })
      })
      .catch(err => console.log(err.error))
  }

  render() {
    return (
      <section className='watch_page'>
        <h2>Watched List</h2>
        <ul className='watch_page__ul'>
          {this.state.isLoaded && this.state.results.map(movie => {
            return (
              <WatchedMovie key={movie.id} movie={movie} delete={this.deleteMovie}/>
            )
          })}
        </ul>
      </section>
    )
  }
}