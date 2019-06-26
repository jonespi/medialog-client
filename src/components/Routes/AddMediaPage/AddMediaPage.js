import React, { Component } from 'react'
import Service from '../../Service/Service'
import MovieDBService from '../../Service/MovieDBService'
import SearchForm from '../../SearchForm/SearchForm'
import SearchResults from '../../SearchResults/SearchResults'
import SelectShowForm from '../../SelectShowForm/SelectShowForm'
import EpisodeResults from '../../EpisodeResults/EpisodeResults'
import AddMediaForm from '../../AddMediaForm/AddMediaForm';
import './AddMediaPage.css'
import Helpers from '../../Utils/Helpers';

class AddMedia extends Component {
  state = {
    movieValid: false,
    tvValid: false,
    showIsValid: false,
    endpoint: '',
    movie: {},
    show: {},
    num_of_seasons: null,
    seasonsLoaded: false,
    episodes: [],
    episodesLoaded: false,
    selectedSeason: null,
    selectedEpisode: null,
    date: Helpers.getNow(),
    recommendation: 'recommend'
  }

  handleSearch = ev => {
    ev.preventDefault()
    const { add_search, media_type } = ev.target
    console.log(media_type.value);
    MovieDBService.getMedia(add_search.value, media_type.value)
      .then(res => {
        if (media_type.value === "tv") {
          this.setState({
            endpoint: 'tv',
            results: res.results.slice(0, 10),
            seasonsLoaded: false,
            episodesLoaded: false
          })
        }
        if (media_type.value === "movie") {
          this.setState({
            results: res.results.slice(0, 10),
            endpoint: 'movie',
            movieLoaded: true
          })
        }
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  updateMovieSelection = (movie) => {
    this.setState({
      movie: JSON.parse(movie)
    }, this.validateMovie)
  }

  updateTvSelection = (show) => {
    this.setState({
      show: JSON.parse(show),
      showIsValid: true
    }, this.validateTv)
  }

  updateEpisodeSelection = (episode) => {
    this.setState({
      selectedEpisode: JSON.parse(episode)
    }, this.validateTv)
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
          <button key={season.number} onClick={(id, season_num) => this.renderSeasonEpisodes(this.state.show.moviedb_id, season.number)}>
            Season {season.number}
          </button>
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
      const show = {
        media_type: 'tv',
        title: this.state.show.name,
        image: this.state.show.image,
        url: this.state.show.url,
        season: this.state.selectedSeason,
        episode_number: this.state.selectedEpisode.episode_number,
        episode_name: this.state.selectedEpisode.episode_name,
        date_watched: this.state.date,
        recommendation: this.state.recommendation
      }
      Service.addMedia(show);
      setTimeout(() => {
        this.props.history.push('/watch_list/')
      }, 500) 
    }

    if (this.state.endpoint === 'movie') {
      const movie = {
        media_type: 'movie',
        title: this.state.movie.title,
        image: this.state.movie.image,
        url: this.state.movie.url,
        date_watched: this.state.date,
        recommendation: this.state.recommendation
      }
      Service.addMedia(movie);
      setTimeout(() => {
        this.props.history.push('/watch_list/')
      }, 500) 
    }
  }

  render() {
    return (
      <section className='add_media_page'>
        <h3>Add Media</h3>
        {(!this.state.tvLoaded || !this.state.seasonsLoaded) &&
        <SearchForm handleSearch={this.handleSearch} />}

        {this.state.endpoint === 'tv' && !this.state.seasonsLoaded && 
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

        {this.state.endpoint === 'movie' && 
          <>
            <AddMediaForm 
              updateRecommendation={this.updateRecommendation} 
              handleAdd={this.handleAdd} 
              isValid={this.state.movieValid}
              date={this.state.date}
              updateDate={this.updateDate}
            />
            <SearchResults 
              endpoint={this.state.endpoint}
              results={this.state.results} 
              change={this.updateMovieSelection}
            />
          </>
        }

        {this.state.seasonsLoaded &&
          <div className="season_buttons">
            {this.renderSeasonButtons(this.state.num_of_seasons)}
          </div>
        }

        {(this.state.episodesLoaded && !this.state.isLoaded) && 
          <AddMediaForm 
            updateRecommendation={this.updateRecommendation} 
            handleAdd={this.handleAdd} 
            isValid={this.state.tvValid}
            date={this.state.date}
            updateDate={this.updateDate}
          />
        }

        {this.state.episodesLoaded && 
          <>
            <EpisodeResults
              episodes={this.state.episodes} 
              updateEpisodeSelection={this.updateEpisodeSelection} />
          </>
        }

      </section>
    )
  }
}

export default AddMedia;