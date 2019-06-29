import React, { Component } from 'react'
import Service from '../../Service/Service'
import {WatchedMovie, WatchedShow} from '../../Utils/Utils'
import {EmptyWatchList} from  '../../Utils/Utils'
import './WatchedPage.css'

export default class WatchedPage extends Component {
  state = {
    isLoaded: false,
    isFiltered: false,
    results: [],
    tvResults: [],
    movieResults: [],
    currentView: 'results'
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = () => {
    Service.getWatchList()
      .then(res => {
        this.setState({
          results: res.reverse(),
        })
      })
      .then(() => {
        this.setState({
          tvResults: this.state.results.filter(item => item.media_type === 'tv'),
          movieResults: this.state.results.filter(item => item.media_type === 'movie'),
          isLoaded: true
        })
      })
      .catch(err => console.log(err.error))
  }

  deleteMedia = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      Service.deleteMedia(id)
      .then(() => {
        this.getResults()
      })
    }
  }

  filterMediaType = (e) => {
    if (e.target.value === 'movie') {
      this.setState({
        currentView: 'movieResults',
        isFiltered: true,
        movieFiltered: true,
        tvFiltered: false,
      })
    } else if (e.target.value === 'tv') {
      this.setState({
        currentView: 'tvResults',
        isFiltered: true,
        movieFiltered: false,
        tvFiltered: true,
      })
    } else {
      this.setState({
        currentView: 'results',
        isFiltered: false,
        movieFiltered: false,
        tvFiltered: false,
      })
    }
  }

  handleSearch = (e) => {    
    let currentList = this.state[this.state.currentView];
    let newList = [];
    if (e.target.value !== "") {
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });

      this.setState({
        isFiltered: true,
        filteredResults: newList
      });
    } else {
      newList = currentList
      this.setState({
        isFiltered: true,
        filteredResults: newList
      })
    }
  }

  renderTypeSelect() {
    return (
      <select onChange={this.filterMediaType} aria-label='media type filter watch list'>
        <option value="all">All</option>
        <option value="movie">Movie</option>
        <option value="tv">Tv</option>
      </select>
    )
  }

  render() {
    return (
      <section className='watch_page'>
        <h2>Watched List</h2>
        <p>Filter By</p>
        <div className="watch_page__select_filters">
          <p>Type: {this.renderTypeSelect(this.state.results)}</p>
          <p>Search: <input type="text" className="input" onChange={this.handleSearch} /></p>
        </div>

        {!this.state.results.length &&
          <EmptyWatchList />
        }

        <ul className='watch_page__ul'>
          {!this.state.isFiltered && this.state.results.map(media => {
            if (media.media_type === 'movie') { 
              return (
                <WatchedMovie key={media.id} movie={media} delete={this.deleteMedia}/>
              )
            }
            if (media.media_type === 'tv') {
              return (
                <WatchedShow key={media.id} show={media} delete={this.deleteMedia} />
              )
            }
            return ''
          })}

          {this.state.movieFiltered  && !this.state.filteredResults && this.state.movieResults.map(media => {
              return <WatchedMovie key={media.id} movie={media} delete={this.deleteMedia}/>
            }
          )}

          {this.state.tvFiltered && !this.state.filteredResults && this.state.tvResults.map(media => {
              return <WatchedShow key={media.id} show={media} delete={this.deleteMedia} />
            }
          )}

          {this.state.isFiltered && this.state.filteredResults && this.state.filteredResults.map(media => {
            if (media.media_type === 'movie') { 
              return (
                <WatchedMovie key={media.id} movie={media} delete={this.deleteMedia}/>
              )
            }
            if (media.media_type === 'tv') {
              return (
                <WatchedShow key={media.id} show={media} delete={this.deleteMedia} />
              )
            }
            return ''
          })}
        </ul>
      </section>
    )
  }
}