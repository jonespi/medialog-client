import React from 'react'
import Modal from 'react-awesome-modal'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './Utils.css'

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
      <div className="image_overlay">
        <a href={movie.url}>
          <img className='result_img' src={movie.image} alt={`${movie.title} poster`} />
          <div className='overlay'>
              <h3>{movie.title}</h3>
            <p><span className="bold">Date Watched:</span> {moment(movie.date_watched).format('ll')}</p>
            <p><span className="bold">Recommendation:</span> {movie.recommendation}</p> 
          </div>
        </a>
      </div>
      <div className="delete_actions"> 
        <button onClick={() => props.delete(movie.id)} aria-label={`delete selected media`}>Delete</button>
      </div>
    </li>
  )
}

WatchedMovie.defaultProps = {
  movie: {},
}

export function WatchedShow(props) {
  const show = props.show
  return (
    <li key={show.id} className="watch_page_li">
      <div className="image_overlay">
        <img className='result_img' src={show.image} alt={`${show.title} poster`} />
        <div className='overlay'>
          <a className='result_url' href={show.url}>
            <h3>{show.title}</h3>
            <p><span className="bold">Season:</span> {show.season}</p>
            <p><span className="bold">Episode Title: </span>{show.episode_name}</p>
            <p><span className="bold">Date Watched:</span> {moment(show.date_watched).format('ll')}</p>
            <p><span className="bold">Recommendation:</span> {show.recommendation}</p>
          </a>
        </div>
      </div>
      <div className="delete_actions">  
        <button onClick={() => props.delete(show.id)} aria-label={`delete selected media`}>Delete</button>
      </div>
    </li>
  )
}

WatchedShow.defaultProps = {
  show: {},
}

export function LogoutModal(props) {
  return <section className="logout_modal">
    <Modal 
      visible={props.visible}
      width="400"
      height="300"
      effect="fadeInUp"
      onClickAway={() => props.closeModal()}
    >
    <div>
      <h1>Are you sure you want to log out?</h1>
      <button onClick={() => props.handleLogout()}>Yes</button>
      <button onClick={() => props.closeModal()}>Cancel</button>
    </div>
    </Modal>
  </section>
}

export function DeleteModal(props) {
  return <section className="logout_modal">
    <Modal 
      visible={props.visible}
      width="400"
      height="300"
      effect="fadeInUp"
      onClickAway={() => props.closeModal()}
    >
    <div>
      <h1>Are you sure you want to delete this item?</h1>
      <button onClick={() => props.handleDelete()}>Yes</button>
      <button onClick={() => props.closeModal()}>Cancel</button>
    </div>
    </Modal>
  </section>
}