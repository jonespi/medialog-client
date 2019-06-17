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
  }

  render() {
    return (
      <section className='watch_page'>
        <h2>Watched List</h2>
        <ul className='watch_page__ul'>
          {this.state.isLoaded && this.state.results.map(movie => {
            return <WatchedMovie movie={movie}/>
          })}
        </ul>
      </section>
    )
  }
}