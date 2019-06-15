import React, { Component } from 'react'
import Service from '../../Service/Service'

export default class WatchedList extends Component {
  state = {
    results: [],
  }

  componentDidMount() {
    this.setState({
      results: Service.getWatchList(),
    })
  }

  render() {
    return (
      <section>
        <h2>Watched List</h2>
      </section>
    )
  }
}