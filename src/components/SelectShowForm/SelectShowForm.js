import React from 'react'
import SearchResults from '../SearchResults/SearchResults'

export default function AddShowForm(props) {
  return  (
    <form className='select_show_form' onSubmit={props.getSeasons}>
      <SearchResults 
        endpoint={props.endpoint}
        results={props.results} 
        change={props.updateTvSelection} 
      />
      <div className="select_season_box">
        <p>Select a show to get seasons:</p>  
        <button type="submit" disabled={!props.showIsValid}>
          Get Seasons
        </button>
      </div>
    </form>
  )
}