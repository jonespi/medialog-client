import React, { Component } from 'react'
import MovieResult from './MovieResult'
import TvResult from './TvResult'
import './SearchResults.css'

export default class SearchResults extends Component {
  static defaultProps = {
    results: [],
  }

  render() {    
      return (
        <ul className='search_results_ul'>
          {this.props.results.map(result => {
            console.log(this.props.endpoint)
            if (this.props.endpoint === 'tv') {
              return <TvResult
                key={result.id}
                result={result}
                change={this.props.change} />
            }
            if (this.props.endpoint === 'movie') {
              return <MovieResult 
                key={result.id}
                result={result} 
                change={this.props.change} />
            }
            return null
          })
          }
        </ul>
      )
  }
}