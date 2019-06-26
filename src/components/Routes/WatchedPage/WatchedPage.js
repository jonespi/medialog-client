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
    monthFilter: false,
    selectedMonth: '',
    selectedYear: '',
    selectedRecommendation: '',
    results: [],
    filteredResults: []
  }

  componentDidMount() {
    this.getResults()
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

  deleteMedia = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      Service.deleteMedia(id)
      .then(() => {
        this.getResults()
      })
    }
  }

  getMonths(results) {
    let months = results.reduce((acc, media) => {
      // create object containing month number and month name, push object into array
      let month = {
        monthNum : Helpers.getMonthNum(media.date_watched),
        monthName : Helpers.getMonthName(media.date_watched)
      }
      acc.push(month)
      // sort the months by month number (i.e. 'January' === 0)
      acc.sort((a, b) => a.monthNum - b.monthNum)
      return acc
    }, [])
    // create a new array only containing month names
    let uniqueMonths = months.map(month => month.monthName)
    return [...new Set(uniqueMonths)]
  }

  getYears(results) {
    let years = results.reduce((acc, media) => {
      let date = media.date_watched
      acc.push(Helpers.getYears(date));
      return acc;
    }, [])
    return [...new Set(years)].sort()
  }

  filterMediaType = (e) => {
    const selectedType = e.target.value;
    const filteredType = this.state.results.filter(result => result.media_type === selectedType.toLowerCase());
     this.setState({
      isFiltered: true,
      selectedType: selectedType,
      filteredResults: filteredType
    })
    if (selectedType === 'All') {
      this.setState({
        isFiltered: false,
        selectedType: '',
        isLoaded: true,
      })
    }
  }

  filterResultsMonths = (e) => {
    const selectedMonth = e.target.value;
    const filteredMonths = this.state.results.filter(result => Helpers.getMonthName(result.date_watched) === selectedMonth);
     this.setState({
      isFiltered: true,
      selectedMonth: selectedMonth,
      filteredResults: filteredMonths
    })
    if (selectedMonth === 'All') {
      this.setState({
        isFiltered: false,
        selectedMonth: '',
        isLoaded: true,
      })
    }
  }

  filterResultsYears = (e) => {
    const selectedYear = e.target.value;
    const filteredYears = this.state.results.filter(result => Helpers.getYears(result.date_watched) === selectedYear);
    this.setState({
      isFiltered: true,
      selectedYear: selectedYear,
      filteredResults: filteredYears,
    })
    if (selectedYear === 'All') {
      this.setState({
        isFiltered: false,
        selectedMonth: '',
        isLoaded: true,
      })
    }
  }

  filterRecommendations = (e) => {
    const selectedRecommendation = e.target.value;
    const filteredRecommendation = this.state.results.filter(result => result.recommendation === selectedRecommendation);
    this.setState({
        isFiltered: true,
        recommendFilter: true,
        isLoaded: false,
        filteredResults: filteredRecommendation
      })
    if (selectedRecommendation === 'All') {
      this.setState({
        isFiltered: false,
        selectedMonth: '',
      })
    }
  }

  renderTypeSelect() {
    return (
      <select onChange={this.filterMediaType}>
        <option>All</option>
        <option>Movie</option>
        <option>Tv</option>
      </select>
    )
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

  render() {
    return (
      <section className='watch_page'>
        <h2>Watched List</h2>
        <p>Filter By</p>
        <div className="watch_page__select_filters">
          <p>Type: {this.renderTypeSelect(this.state.results)}</p>
          <p>Month: {this.renderMonthsSelect(this.state.results)}</p>
          <p>Year: {this.renderYearsSelect(this.state.results)}</p>
          <p>Recommend: {this.renderRecommendSelect(this.state.results)}</p>
        </div>

        <ul className='watch_page__ul'>
          {!this.state.isFiltered && this.state.results.map(media => {
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