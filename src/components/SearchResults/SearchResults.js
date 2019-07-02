import React, { Component } from 'react'
import MovieResult from './MediaResultTypes/MovieResult'
import TvResult from './MediaResultTypes/TvResult'
import './SearchResults.css'

export default class SearchResults extends Component {
  static defaultProps = {
    results: [],
    change: () => {},
  }

  render() {    
      return (
        <ul className='search_results_ul'>
          {this.props.results.map(result => {
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