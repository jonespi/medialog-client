import React from 'react'

export default function SearchForm(props) {
  return (
    <section className='search'>
      <form className="search_form" onSubmit={props.handleSearch}>
        <input name='add_search' type='text' required id='add_page___search' />
        <button>Search</button>
      </form>
    </section>
    )
}