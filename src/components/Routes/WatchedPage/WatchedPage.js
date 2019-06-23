import React, { Component } from 'react'
import Service from '../../Service/Service'
import WatchedMovie from '../../WatchedMovie/WatchedMovie'
import WatchedShow from '../../WatchedShow/WatchedShow'
import Helpers from '../../Utils/Helpers'
import './WatchedPage.css'

export default class WatchedList extends Component {
  state = {
    isLoaded: false,
    isFiltered: false,
    selectedMonth: '',
    selectedYear: '',
    results: [],
    filteredResults: []
  }

  componentDidMount() {
    this.getResults()
  }

  deleteMedia = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      this.setState({
        isLoaded: false,
      })
      Service.deleteMedia(id)
      .then(() => {
        this.getResults()
      })
    }
  }

  getResults = () => {
    Service.getWatchList()
      .then(res => {
        this.setState({
          results: res.reverse()
        })
      })
      .then(() => {
        this.setState({
          isLoaded: true
        })
      })
      .catch(err => console.log(err.error))
  }

  getMonths(results) {
    let months = results.reduce((acc, media) => {
      let newdate = Helpers.getMonth(media.date_watched);
      acc.push(newdate);
      return acc.sort((a,b) => a < b);
    }, [])
    return [...new Set(months)]
  }

  getYears(results) {
    let years = results.reduce((acc, media) => {
      let date = media.date_watched
      acc.push(Helpers.getYears(date));
      return acc;
    }, [])
    return [...new Set(years)].sort()
  }

  renderMonthsSelect(results) {
    const months = this.getMonths(results)
    return (
      <select onChange={this.filterResultsMonths}>
        <option>All</option>
        {months.map(month => <option key={month}>{month}</option>)}
      </select>
    )
  }

  renderYearsSelect(results) {
    const years = this.getYears(results)
    return (
      <select onChange={this.filterResultsYears}>
        <option>All</option>
        {years.map(year => <option key={year}>{year}</option>)}
      </select>
    )
  }

  renderRecommendSelect() {
    return (
      <select onChange={this.filterRecommendations}>
        <option>All</option>
        <option value='recommend'>Recommended</option>
        <option value='do-not-recommend'>Do Not Recommend</option>
      </select>
    )
  }

  filterResultsMonths = (e) => {
    const selectedMonth = e.target.value;
    const filteredMonths = this.state.results.filter(result => Helpers.getMonth(result.date_watched) === selectedMonth);
    if (selectedMonth === 'All') {
      this.setState({
        isFiltered: false,
        isLoaded: true,
        filteredResults: []
      })
    } else {   
      this.setState({
        isFiltered: true,
        monthFilter: true,
        isLoaded: false,
        filteredResults: filteredMonths
      })
    }
  }

  filterResultsYears = (e) => {
    const selectedYear = e.target.value;
    const filteredYears = this.state.results.filter(result => Helpers.getYears(result.date_watched) === selectedYear);
    if (selectedYear === 'All') {
      this.setState({
        isFiltered: false,
        isLoaded: true,
        filteredResults: []
      })
    } else {   
      this.setState({
        isFiltered: true,
        yearFilter: true,
        isLoaded: false,
        filteredResults: filteredYears
      })
    }
  }

  filterRecommendations = (e) => {
    const selectedRecommendation = e.target.value;
    const filteredRecommendation = this.state.results.filter(result => result.recommendation === selectedRecommendation);
    if (selectedRecommendation === 'All') {
      this.setState({
        isFiltered: false,
        isLoaded: true,
        filteredResults: []
      })
    } else {   
      this.setState({
        isFiltered: true,
        recommendFilter: true,
        isLoaded: false,
        filteredResults: filteredRecommendation
      })
    }
  }

  render() {
    return (
      <section className='watch_page'>
        <h2>Watched List</h2>
        <div className="watch_page__select_filters">
          <p>Month: {this.renderMonthsSelect(this.state.results)}</p>
          <p>Year: {this.renderYearsSelect(this.state.results)}</p>
          <p>Recommendation: {this.renderRecommendSelect(this.state.results)}</p>
        </div>

        <ul className='watch_page__ul'>
          {this.state.isLoaded && this.state.results.map(media => {
            if (media.media_type === 'movie') { 
              return (
                <WatchedMovie key={media.id} movie={media} delete={this.deleteMedia}/>
              )
            }
            if (media.media_type === 'tv') {
              return (
                <WatchedShow key={media.id} show={media} delete={this.deleteMedia} />
              )
            }
            return ''
          })}

          {this.state.isFiltered && this.state.filteredResults.map(media => {
            if (media.media_type === 'movie') { 
              return (
                <WatchedMovie key={media.id} movie={media} delete={this.deleteMedia}/>
              )
            }
            if (media.media_type === 'tv') {
              return (
                <WatchedShow key={media.id} show={media} delete={this.deleteMedia} />
              )
            }
            return ''
          })}
        </ul>
      </section>
    )
  }
}