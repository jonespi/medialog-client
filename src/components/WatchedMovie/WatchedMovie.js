import React from 'react'
import Helpers from '../Utils/Helpers'

export default function WatchedMovie(props) {
  const movie = props.movie
  return (
    <li key={movie.id}>
      <a href={movie.url}>
        <img className='result_img' src={props.movie.image} alt={`${props.movie.title} poster`} />
        <br />
        <i class="fas fa-film"></i> 
        <br/>
        {movie.title}
        <br/>
      </a>
      Date Watched: {Helpers.getDate(movie.date_watched)}
      <br/>
      <button onClick={() => props.delete(movie.id)}>Delete</button>
    </li>
  )
}