import React from 'react'
import Helpers from '../Utils/Helpers'

export default function WatchedShow(props) {
  const show = props.show
  return (
    <li key={show.id}>
      <a href={show.url}>
        <img className='result_img' src={show.image} alt={`${show.title} poster`} />
        <br />
        <i class="fas fa-tv"></i>
        <br />
        {show.title}
      </a>
      <div>
        Season: {show.season}
      <br />
        {show.episode_name}
      <br/>
        Date Watched: {Helpers.getDate(show.date_watched)}
      <br/>
      </div>
      <button onClick={() => props.delete(show.id)}>Delete</button>
    </li>
  )
}