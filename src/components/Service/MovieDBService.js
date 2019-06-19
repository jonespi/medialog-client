import config from '../../config'

const MovieDBService = {
  getMovies(query) {
    return fetch(`${config.MOVIE_DB_ENDPOINT}/search/movie?api_key=${config.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getTV(query) {
    return fetch(`${config.MOVIE_DB_ENDPOINT}/search/tv?api_key=${config.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

  getSeasons(moviedb_id) {
    return fetch(`${config.MOVIE_DB_ENDPOINT}/tv/${moviedb_id}?api_key=${config.MOVIE_DB_API_KEY}`)
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

  getEpisodes(moviedb_id, season_num) {
    return fetch(`${config.MOVIE_DB_ENDPOINT}/tv/${moviedb_id}/season/${season_num}?api_key=${config.MOVIE_DB_API_KEY}`)
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
}

export default MovieDBService;