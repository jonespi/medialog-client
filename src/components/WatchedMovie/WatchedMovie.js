import React from 'react'

export default function WatchedMovie(props) {
  const movie = props.movie
  return (
    <li key={movie.id}>
      <img className='result_img' src={props.movie.image} />
      <br />
      <a href={movie.url}>{movie.title}</a>
    </li>
  )
}