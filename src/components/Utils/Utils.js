import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

export function SeasonButton(props) {
  return (
    <button 
      key={props.season_num} 
      onClick={(id, season_num) => 
      props.renderSeasonEpisodes(props.id, props.season_num)}>
        Season {props.season_num}
    </button>
  )
};

export function EmptyWatchList() {
  return <div className="empty-watch-list">
    <p>Your watch list is empty.</p>
    <Link to='/add_media' className="link-to-add">Add something to your watch list?</Link>
  </div>
}

export function NoResults() {
  return <div className="no-results">
    <p>
      No results. Search again with a different term.
    </p>
  </div>
}

export function Login(props) {
  return <form onSubmit={props.handleSubmit} className="login_form">
    <span>
      <h3>Username</h3>
      {props.error && <p>{props.error}</p>}
      <input name='user_name' type='text' required id='login_form__user_name' aria-label="username" defaultValue={props.defaultUsername} />
    </span>
    <span>
      <h3>Password</h3>
      <input name='password' type={props.passwordVisibility} onChange={props.passwordUpdate} required id='login_form__password' aria-label='password' defaultValue={props.defaultPassword} />
    </span>
    <br/>
    <button aria-label='submit login'>
      Submit
    </button>
  </form>
}

export function WatchedMovie(props) {
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

WatchedMovie.defaultProps = {
  movie: {}
}

export function WatchedShow(props) {
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
      <button onClick={() => props.delete(show.id)} aria-label={`delete selected media`}>Delete</button>
    </li>
  )
}

WatchedShow.defaultProps = {
  show: {}
}