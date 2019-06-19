import React from 'react'
import SearchResults from '../SearchResults/SearchResults'

export default function AddMovieForm(props) {
  return  <form className='results_form' onSubmit={props.handleAdd}>
    <div className='results_form__context'>
      <div>
        <p>Recommended?</p>
        <select name="recommendation" onChange={props.updateRecommendation}>
          <option value="recommended">recommended</option>
          <option value="do-not-recommend">do not recommend</option>
        </select>
      </div>
      <div>
        <p>Date watched:</p>
        {props.renderDateInput(props.getDate())}
      </div>
    </div>
    <button type="submit" disabled={!props.isValid}>
      Add movie
    </button>
    <SearchResults results={props.results} change={props.updateMovieSelection} className='search_results' />
  </form>
}