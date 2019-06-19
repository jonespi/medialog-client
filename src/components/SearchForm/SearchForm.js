import React from 'react'

export default function SearchForm(props) {
  return (
    <section className='add_movie__search_form'>
      <form onSubmit={props.handleSearch}>
      <span>
        <input name='add_search' type='text' required id='add_page___search' />
        <button>Search</button>
      </span>
      </form>
    </section>
    )
}