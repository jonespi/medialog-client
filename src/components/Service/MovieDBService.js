import config from '../../config'

const MovieDBService = {
  getMovies(query) {
    return fetch(`${config.MOVIE_DB_ENDPOINT}/movie?api_key=${config.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`, {
      headers: {
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getTV(query) {
    return fetch(`${config.MOVIE_DB_ENDPOINT}/tv?api_key=${config.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`, {
      headers: {
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
}

export default MovieDBService;