import React from 'react'
import TvShowResults from '../TvShowResults/TvShowResults'

export default function AddShowForm(props) {
  return  (
  <>
    <form className='show_results_form' onSubmit={props.getSeasons}>
      <button type="submit" disabled={!props.showIsValid}>
        Get Seasons
      </button>
    </form>
    <TvShowResults results={props.results} change={props.updateTvSelection} className='search_results' />
  </>
  )
}