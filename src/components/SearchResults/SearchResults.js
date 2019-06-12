import React, { Component } from 'react'

class SearchResults extends Component {
  render() {
    return (
      <div>
        <fieldset>
          {this.props.results.map(result => {
            return (
              <div key={result.id}>
                <input name="movies" type="radio" value={result.id} required/>
                {result.title}
              </div>
            )
          })}
        </fieldset>
      </div>
    )
  }
}

export default SearchResults