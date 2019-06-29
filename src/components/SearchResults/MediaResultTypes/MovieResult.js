import React from 'react'

export default function MovieResult(props) {
    const movie = {
      "title": props.result.title,
      "url": `https://themoviedb.org/movie/${props.result.id}`,
      "image": `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${props.result.poster_path}`
    }
    
    if (!props.result.poster_path) {
      movie.image = 'https://picsum.photos/200/300'
    }
    
    return (
      <li className="movie_result">
        <label htmlFor={`movie_${props.result.id}`}> 
          <img className='result_img' src={movie.image} alt={`${movie.title} poster`} />
          <br />
          <input name="movies" value={JSON.stringify(movie)} type="radio" id={`movie_${props.result.id}`} required onChange={e => props.change(e.target.value)}  />
          {movie.title}
        </label>
      </li>
    )
  }

MovieResult.defaultProps = {
  change: () => {},
  result: {
    title: '',
    id: '',
    poster_path: ''
  }
}