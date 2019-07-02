import React from 'react'
import './EpisodeResults.css'

export default function EpisodeResults(props) {
    return (
        <div className="episode_results">
          <ul className='episode_results__ul'>
            {props.episodes.map(result => {
              const episode = {
                id: result.id,
                episode_number: result.episode_number,
                episode_name: result.name
              }
              return (
                  <li key={result.id}>
                    <label htmlFor={`episode_${result.id}`}>
                    <input name="episode" value={JSON.stringify(episode)} type="checkbox" id={`episode_${result.id}`} onChange={(e) => props.updateEpisodeSelection(e.target.value)} />
                      {episode.episode_name}
                    </label>
                  </li>
              )
            })}
          </ul>
        </div>
    )
}