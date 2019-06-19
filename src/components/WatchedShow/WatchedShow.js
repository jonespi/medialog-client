import React from 'react'

export default function WatchedShow(props) {
  const show = props.show
  return (
    <li key={show.id}>
      <a href={show.url}>
        <img className='result_img' src={show.image} alt={`${show.title} poster`} />
        <br />
        {show.title}
      </a>
      <br />
        Season: {show.season}
      <br />
        {show.episode_name}
      <br/>
      <button onClick={() => props.delete(show.id)}>Delete</button>
    </li>
  )
}