import React from 'react'
import './EpisodeResults.css'

export default function EpisodeResults(props) {
    return (
      <fieldset>
        <ul className='episode_results__ul'>
          {props.episodes.map(result => {
            const episode = {
              id: result.id,
              episode_number: result.episode_number,
              episode_name: result.name
            }
            return (
                <li>
                  <label>
                  <input name="episode" value={JSON.stringify(episode)} type="radio" id={`episode_${result.id}`} onChange={e => props.updateEpisodeSelection(e.target.value)} required  />
                    {episode.episode_name}
                  </label>
                </li>
            )
          })}
        </ul>
      </fieldset>
    )
}