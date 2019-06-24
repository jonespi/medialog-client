import React, { Component } from 'react'
import Service from '../../Service/Service'
import MovieDBService from '../../Service/MovieDBService'
import SearchForm from '../../SearchForm/SearchForm'
import SelectShowForm from '../../SelectShowForm/SelectShowForm'
import EpisodeResults from '../../EpisodeResults/EpisodeResults'
import AddShowForm from '../../AddShowForm/AddShowForm';
import './AddShowPage.css'

class AddShow extends Component {
  state = {
    isLoaded: false,
    isValid: false,
    showIsValid: false,
    endpoint: 'tv',
    show: {},
    num_of_seasons: null,
    seasonsLoaded: false,
    episodes: [],
    episodesLoaded: false,
    selectedSeason: null,
    selectedEpisode: null,
    date: this.getDate(),
    recommendation: 'recommend'
  }

  getDate() {
    let now = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    let minDate = now.substring(0,9).split('/')
    // Hack to get the date default to current day in PST
    if (minDate[0].length > 1) {
      return [minDate[2], minDate[0], minDate[1]].join('-');  
    } else {
      return [minDate[2], `0${minDate[0]}`, minDate[1]].join('-');
    }
  }

  handleSearch = ev => {
    ev.preventDefault()
    const { add_search } = ev.target
      MovieDBService.getTV(add_search.value)
      .then(res => {
        this.setState({
          results: res.results.slice(0, 10),
          isLoaded: true,
          seasonsLoaded: false,
          episodesLoaded: false
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  updateTvSelection = (show) => {
    this.setState({
      show: JSON.parse(show),
      showIsValid: true
    }, this.validateSubmit)
  }

  updateEpisodeSelection = (episode) => {
    this.setState({
      selectedEpisode: JSON.parse(episode)
    }, this.validateSubmit)
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

  validateSubmit = (name) => {
    if (this.state.selectedEpisode !== null &&
      this.state.show !== null && 
      this.state.date !== null && 
      this.state.recommend !== null) {
      this.setState({
        isValid: true
      })
    }
  }

  getSeasons = (e) => {
    e.preventDefault()
    MovieDBService.getSeasons(this.state.show.moviedb_id)
    .then(res => {
      this.setState({
        num_of_seasons: res.number_of_seasons,
        isLoaded: false,
        seasonsLoaded: true
      })
    })
  }

  renderSeasonButtons = (num_of_seasons) => {
    let buttons = [];
    for (let i = 1; i <= num_of_seasons; i++) {
      buttons.push({ number: i});
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
    Service.AddMedia(show);
    setTimeout(() => {
      this.props.history.push('/watch_list/')
    }, 500) 
  }

  render() {
    return (
      <section className='add_show_page'>
        <h3>Add Show</h3>
        {(!this.state.isLoaded || !this.state.seasonsLoaded) &&
        <SearchForm handleSearch={this.handleSearch} />}

        {this.state.isLoaded && 
          <SelectShowForm 
            getSeasons={this.getSeasons}
            results={this.state.results}
            updateTvSelection={this.updateTvSelection}
            showIsValid={this.state.showIsValid}
            />
        }

        {this.state.seasonsLoaded &&
          <div className="season_buttons">
            {this.renderSeasonButtons(this.state.num_of_seasons)}
          </div>
        }

        {this.state.episodesLoaded && 
          <div className='add_show_page__episode_results' >
            <EpisodeResults
              episodes={this.state.episodes} 
              updateEpisodeSelection={this.updateEpisodeSelection} />
          </div>
        }

        {(this.state.episodesLoaded && !this.state.isLoaded) && 
          <AddShowForm 
            updateRecommendation={this.updateRecommendation} 
            handleAdd={this.handleAdd} 
            isValid={this.state.isValid}
            // getDate={this.getDate}
            updateDate={this.updateDate}
          />}

      </section>
    )
  }
}

export default AddShow;