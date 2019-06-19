import React, { Component } from 'react'
import Service from '../../Service/Service'
import WatchedMovie from '../../WatchedMovie/WatchedMovie'
import WatchedShow from '../../WatchedShow/WatchedShow'
import './WatchedPage.css'

export default class WatchedList extends Component {
  state = {
    isLoaded: false,
    results: [],
  }

  componentDidMount() {
    this.getResults()
  }

  deleteMedia = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      this.setState({
        isLoaded: false,
      })
      Service.deleteMedia(id)
      .then(() => {
        this.getResults()
      })
    }
  }

  getResults = () => {
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
          {this.state.isLoaded && this.state.results.map(media => {
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