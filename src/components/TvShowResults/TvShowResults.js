import React, { Component } from 'react'

export default class TvShowResults extends Component {
  render() {
    return (
      <fieldset>
        <ul className='search_results_ul'>
          {this.props.results.map(result => {
            const show = {
              moviedb_id: result.id,
              name: result.name,
              url: `https://themoviedb.org/tv/${result.id}`,
              image: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`
            }

            return (
              <li key={result.id} className="show_result">
                <label> <img className='result_img' src={show.image} alt={`${show.name} poster`} />
                <br />
                <input name="tv_show" value={JSON.stringify(show)} type="radio" id={`show${result.id}`} required onChange={e => this.props.change(e.target.value)}  />
                {show.name}
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>
    )
  }
}