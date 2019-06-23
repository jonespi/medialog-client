import React from 'react'
import moment from 'moment'

export default function WatchedShow(props) {
  const show = props.show
  return (
    <li key={show.id} className="watch_page_li">
      <a className='result_url' href={show.url}>
        <img className='result_img' src={show.image} alt={`${show.title} poster`} />
        <h3>{show.title}</h3>
      </a>
      <i className="fas fa-tv"></i>
      <p>Season: {show.season}</p>
      <p>{show.episode_name}</p>
      <p>Date Watched: {moment(show.date_watched).format('ll')}</p>
      <button onClick={() => props.delete(show.id)}>Delete</button>
    </li>
  )
}