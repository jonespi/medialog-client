import config from '../../config'
import TokenService from './TokenService'

const Service = {
  postWatchList(movie) {
    return fetch(`${config.API_ENDPOINT}/movie`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getWatchList() {
    const user_id = TokenService.getAuthToken()
    const payload = user_id.payload

    console.log('user_id', user_id.payload);

    return fetch(`${config.API_ENDPOINT}/watch_list/${user_id}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default Service