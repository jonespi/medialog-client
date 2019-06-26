import React from 'react'

export default function SearchForm(props) {
  return (
    <section className='search'>
      <form className="search_form" onSubmit={props.handleSearch}>
        <ul className="segmented-control">
          <li className="segmented-control__item">
              <input className="segmented-control__input" type="radio" value="movie" name="media_type" id="movie" defaultChecked/>
              <label className="segmented-control__label" htmlFor="movie">Movie</label>
          </li>
          <li className="segmented-control__item">
              <input className="segmented-control__input" type="radio" value="tv" name="media_type" id="tv" />
              <label className="segmented-control__label" htmlFor="tv">TV</label>
          </li>
        </ul>
        <input name='add_search' type='text' required id='add_page___search' />
        <button>Search</button>
      </form>
    </section>
    )
}