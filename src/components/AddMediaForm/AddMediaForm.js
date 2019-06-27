import React from 'react'

export default function AddMediaForm(props) {
  return  <form className='add_media_form' onSubmit={props.handleAdd}>
    <div className='add_media_form__context'>
        <div className="add_media_form__context__recommendation">
          <p>Recommended?</p>
          <select name="recommendation" onChange={props.updateRecommendation} aria-label="recommend or do not recommend">
            <option value="recommended">recommended</option>
            <option value="do-not-recommend">do not recommend</option>
          </select>
        </div>
        <div className="add_media_form__context__date_watched">
          <p>Date watched:</p>
          <input type="date" className="form-control" id="date" name="date" onChange={props.updateDate} max={props.date} defaultValue={props.date} aria-label="date viewed selection" />
        </div>
    </div>
    <button type="submit" disabled={!props.isValid} aria-label="add media to watch list">
      Add media
    </button>
  </form>
}