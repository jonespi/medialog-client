import React from 'react'

export default function WatchedMovie(props) {
  const movie = props.movie
  return (
    <li key={movie.id}>
      <a href={movie.url}>
        <img className='result_img' src={props.movie.image} alt={`${props.movie.title} poster`} />
        <br />
        {movie.title}
      </a>
      <br/>
      <button onClick={() => props.delete(movie.id)}>Delete</button>
    </li>
  )
}