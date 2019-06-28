import React from 'react'
import {Link} from 'react-router-dom'

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