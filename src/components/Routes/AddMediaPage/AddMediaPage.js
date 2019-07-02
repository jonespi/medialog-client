import React, { Component } from 'react'
import Service from '../../Service/Service'
import MovieDBService from '../../Service/MovieDBService'
import {SeasonButton, NoResults} from '../../Utils/Utils'
import SearchForm from '../../SearchForm/SearchForm'
import SearchResults from '../../SearchResults/SearchResults'
import SelectShowForm from '../../SelectShowForm/SelectShowForm'
import EpisodeResults from '../../EpisodeResults/EpisodeResults'
import AddMediaForm from '../../AddMediaForm/AddMediaForm';
import './AddMediaPage.css'
import Helpers from '../../Utils/Helpers';

class AddMediaPage extends Component {
  state = {
    movieValid: false,
    tvValid: false,
    showIsValid: false,
    endpoint: '',
    results: [],
    searched: false,
    noResults: false,
    movie: [],
    show: {},
    num_of_seasons: null,
    seasonsLoaded: false,
    episodes: [],
    episodesLoaded: false,
    selectedSeason: null,
    selectedEpisode: [],
    selectAllEpisodes: false,
    date: Helpers.getNow(),
    recommendation: 'recommend'
  }

  resetState = () => {
    this.setState({
      searched: false,
      noResults: false,
      seasonsLoaded: false,
      episodesLoaded: false,
      selectedSeason: null,
      selectedEpisode: null || [],
      showIsValid: false
    })
  }

  handleSearch = ev => {
    ev.preventDefault()
    this.resetState()
    const { add_search, media_type } = ev.target
    MovieDBService.getMedia(add_search.value, media_type.value)
      .then(res => {
        this.resetState()
        if (media_type.value === "tv") {
          this.setState({
            endpoint: 'tv',
            results: res.results,
            searched: true,
            seasonsLoaded: false,
            episodesLoaded: false
          }, this.validateResults)
        }
        if (media_type.value === "movie") {
          this.setState({
            endpoint: 'movie',
            results: res.results,
            searched: true,
          }, this.validateResults)
        }
      }, this.validateResults)
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  validateResults = () => {
    if (!this.state.results.length) {
      this.setState({
        noResults: true
      })
    }
  }

  updateMovieSelection = (movie) => {
    let movieObj = JSON.parse(movie)
    console.log(movieObj)
    let movieArr = this.state.movie
    if (movieArr.filter(item => item.id === movieObj.id).length === 0) {
      movieArr.push(movieObj)
      console.log(movieArr)
      this.setState({
        movie: movieArr
      }, this.validateMovie)
    } else {
      this.setState({
        movie: movieArr.filter(item => item.id !== movieObj.id)
      }, this.validateMovie)
    }
  }

  updateTvSelection = (show) => {
    this.setState({
      show: JSON.parse(show),
      showIsValid: true
    }, this.validateTv)
  }

  updateEpisodeSelection = (episode) => {
    let episodeObj = JSON.parse(episode);
    let episodeArr = this.state.selectedEpisode;
    if (episodeArr.filter(item => item.id === episodeObj.id).length === 0) {
      episodeArr.push(episodeObj)
      this.setState({
        selectedEpisode: episodeArr
      }, this.validateTv)
    } else {
      this.setState({
        selectedEpisode: episodeArr.filter(item => item.id !== episodeObj.id)
      }, this.validateTv)
    }
  }

  updateRecommendation = (e) => {
    this.setState({
      recommendation: e.target.value 
    }, this.validateSubmit)
  }

  updateDate = (e) => {
    this.setState({
      date: e.target.value 
    }, this.validateSubmit)
  }

  validateMovie = () => {
    if (this.state.movie !== null && this.state.date !== null && this.state.recommend !== null) {
      this.setState({
        movieValid: true
      })
    }
  }

  validateTv = () => {
    if (this.state.selectedEpisode !== null &&
      this.state.show !== null && 
      this.state.date !== null && 
      this.state.recommend !== null) {
      this.setState({
        tvValid: true
      })
    }
  }

  getSeasons = (e) => {
    e.preventDefault()
    MovieDBService.getSeasons(this.state.show.moviedb_id)
    .then(res => {
      this.setState({
        num_of_seasons: res.number_of_seasons,
        tvLoaded: false,
        seasonsLoaded: true
      })
    })
  }

  renderSeasonButtons = (num_of_seasons) => {
    let buttons = [];
    for (let i = 1; i <= num_of_seasons; i++) {
      buttons.push({ number: i });
    }
    return buttons.map(season => {
      return (
        <SeasonButton 
          id={this.state.show.moviedb_id}
          season_num={season.number}
          renderSeasonEpisodes={this.renderSeasonEpisodes}
        />
      )
    })
  }

  renderSeasonEpisodes = (moviedb_id, season_num) => {
    MovieDBService.getEpisodes(moviedb_id, season_num)
      .then(res => {
        this.setState({
          selectedSeason: season_num,
          episodes: res.episodes,
          episodesLoaded: true
        })
      })
  }

  handleAdd = (e) => {
    e.preventDefault()
    if (this.state.endpoint === 'tv') {
      this.state.selectedEpisode.forEach(episode => {
        const show = {
          media_type: 'tv',
          title: this.state.show.name,
          image: this.state.show.image,
          url: this.state.show.url,
          season: this.state.selectedSeason,
          episode_number: episode.episode_number,
          episode_name: episode.episode_name,
          date_watched: this.state.date,
          recommendation: this.state.recommendation
        }
        Service.addMedia(show);
        setTimeout(() => {
          this.props.history.push('/watch_list/')
        }, 500) 
      })
    }

    if (this.state.endpoint === 'movie') {
      this.state.movie.forEach(film => {
        const movie = {
          media_type: 'movie',
          title: film.title,
          image: film.image,
          url: film.url,
          date_watched: this.state.date,
          recommendation: this.state.recommendation
        }
        Service.addMedia(movie);
        setTimeout(() => {
          this.props.history.push('/watch_list/')
        }, 500) 
      })
      }
  }

  render() {
    return (
      <section className='add_media_page'>
        <h3>Add Media</h3>
        <SearchForm handleSearch={this.handleSearch} />

        {this.state.noResults &&
          <NoResults />
        }

        {this.state.endpoint === 'tv' && !this.state.noResults && !this.state.seasonsLoaded && 
          <>
            <SelectShowForm 
              endpoint={this.state.endpoint}
              getSeasons={this.getSeasons}
              results={this.state.results}
              updateTvSelection={this.updateTvSelection}
              showIsValid={this.state.showIsValid}
            />
          </>
        }

        {(this.state.endpoint === 'movie' && !this.state.noResults)&& 
          <div className="add_movie_display">
            <SearchResults 
              endpoint={this.state.endpoint}
              results={this.state.results} 
              change={this.updateMovieSelection}
            />
            <AddMediaForm 
              updateRecommendation={this.updateRecommendation} 
              handleAdd={this.handleAdd} 
              isValid={this.state.movieValid}
              date={this.state.date}
              updateDate={this.updateDate}
            />
          </div>
        }

        {this.state.showIsValid &&
          <div className="season_buttons">
            {this.renderSeasonButtons(this.state.num_of_seasons)}
          </div>
        }

        {(this.state.episodesLoaded && !this.state.isLoaded) &&
          <div className="add_episode_display">
            <EpisodeResults
              episodes={this.state.episodes}
              updateEpisodeSelection={this.updateEpisodeSelection}
              />
            <AddMediaForm 
              updateRecommendation={this.updateRecommendation} 
              handleAdd={this.handleAdd} 
              isValid={this.state.tvValid}
              date={this.state.date}
              updateDate={this.updateDate}
            />
          </div>
        }

      </section>
    )
  }
}

export default AddMediaPage;