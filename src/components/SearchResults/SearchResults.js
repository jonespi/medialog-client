import React, { Component } from 'react'
import './SearchResults.css'

class SearchResults extends Component {
  render() {
    return (
      <div>
        <fieldset>
          {this.props.results.map(result => {
            const movie = {
              "title": result.title,
              "url": `https://themoviedb.org/movie/${result.id}`,
              "img": `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`
            }

            return (
              <div key={result.id}>
                <img className='result_img' src={movie.img} />
                <br />
                <input name="movies" value={JSON.stringify(movie)} type="radio" id="movie-selection" required onChange={e => this.props.change(e.target.value)}  />
                {movie.title}
              </div>
            )
          })}
        </fieldset>
      </div>
    )
  }
}

export default SearchResults