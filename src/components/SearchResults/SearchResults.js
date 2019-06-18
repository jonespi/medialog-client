import React, { Component } from 'react'
import './SearchResults.css'

class SearchResults extends Component {
  render() {
    return (
      <fieldset>
        <ul className='search_results_ul'>
          {this.props.results.map(result => {
            const movie = {
              "title": result.title,
              "url": `https://themoviedb.org/movie/${result.id}`,
              "image": `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`
            }

            return (
              <li key={result.id} className="movie_result">
                <label> <img className='result_img' src={movie.image} alt={`${movie.title} poster`} />
                <br />
                <input name="movies" value={JSON.stringify(movie)} type="radio" id={`movie_${result.id}`} required onChange={e => this.props.change(e.target.value)}  />
                {movie.title}
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>
    )
  }
}

export default SearchResults