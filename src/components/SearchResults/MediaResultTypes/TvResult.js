import React from 'react'

export default function TvResult(props) {
  const show = {
    moviedb_id: props.result.id,
    name: props.result.name,
    url: `https://themoviedb.org/tv/${props.result.id}`,
    image: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${props.result.poster_path}`
  }

  if (!props.result.poster_path) {
    show.image = 'https://picsum.photos/200/300'
  }

  return (
    <li className="movie_result">
      <label htmlFor={`show${props.result.id}`}> 
        <img className='result_img' src={show.image} alt={`${show.name} poster`} />
        <br />
        <input name="tv_show" value={JSON.stringify(show)} type="radio" id={`show${props.result.id}`} required onChange={e => props.change(e.target.value)}  />
        {show.name}
      </label>
    </li>
  )
}

TvResult.defaultProps = {
  change: () => {},
  result: {
    title: '',
    id: '',
    poster_path: ''
  }
}