import React from 'react'
import SearchResults from '../SearchResults/SearchResults'

export default function AddShowForm(props) {
  return  (
    <form className='select_show_form' onSubmit={props.getSeasons}>
      <button type="submit" disabled={!props.showIsValid}>
        Get Seasons
      </button>
      <SearchResults 
        endpoint={props.endpoint}
        results={props.results} 
        change={props.updateTvSelection} 
      />
    </form>
  )
}