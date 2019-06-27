import React from 'react'
import moment from 'moment'

export default function WatchedMovie(props) {
  const movie = props.movie
  return (
    <li key={movie.id} className="watch_page_li">
      <a href={movie.url}>
        <img className='result_img' src={props.movie.image} alt={`${props.movie.title} poster`} />
        <h3>{movie.title}</h3>
      </a>
      <i className="fas fa-film"></i> 
      <p>Date Watched: {moment(movie.date_watched).format('ll')}</p>
      <button onClick={() => props.delete(movie.id)} aria-label={`delete ${movie.title}`}>Delete</button>
    </li>
  )
}