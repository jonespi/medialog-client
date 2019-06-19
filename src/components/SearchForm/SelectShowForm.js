import React from 'react'
import TvShowResults from '../TvShowResults/TvShowResults'

export default function AddShowForm(props) {
  return  (
  <>
    <TvShowResults results={props.results} change={props.updateTvSelection} className='search_results' />
    <form className='results_form' onSubmit={props.getSeasons}>
      <button type="submit">
        Get Seasons
      </button>
    </form>
  </>
  )
}