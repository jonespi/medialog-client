import React, { Component } from 'react'
import Service from '../../Service/Service'
import {WatchedMovie, WatchedShow} from '../../Utils/Utils'
import {EmptyWatchList, DeleteModal, BulkDeleteModal} from  '../../Utils/Utils'
import './WatchedPage.css'

export default class WatchedPage extends Component {
  state = {
    isLoaded: false,
    isFiltered: false,
    modalVisible: false,
    bulkModalVisible: false,
    mediaId: null,
    selectedMedia: [],
    results: [],
    tvResults: [],
    movieResults: [],
    currentView: 'results'
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = () => {
    Service.getWatchList()
      .then(res => {
        res.forEach(item => item.isChecked = false);
        this.setState({
          allChecked: false,
          results: res.sort((a, b) => b.id - a.id)
        })
      })
      .then(() => {
        this.setState({
          tvResults: this.state.results.filter(item => item.media_type === 'tv'),
          movieResults: this.state.results.filter(item => item.media_type === 'movie'),
          isLoaded: true
        })
      })
      .catch(err => console.log(err.error))
  }

  deleteMedia = () => {
    Service.deleteMedia(this.state.mediaId)
    .then(() => {
      this.getResults()
      this.setState({
        modalVisible: false
      })
    })
  }

  deleteSelected = () => {
    this.state.selectedMedia.forEach(id => {
      Service.deleteMedia(id)
      .then(() => {
        this.getResults()
        this.setState({
          bulkModalVisible: false,
          selectedMedia: []
        })
      })
    })
  }

  selectItems = (e) => {
    let id = e.target.value
    let mediaArr = this.state.selectedMedia
    if (mediaArr.filter(item => item === id).length === 0) {
      mediaArr.push(id)
      this.setState({
        selectedMedia: mediaArr
      }, this.validateTv)
    } else {
      this.setState({
        selectedMedia: mediaArr.filter(item => item !== id)
      })
    }
  }

  bulkOpenModal = () => {
    this.setState({
      bulkModalVisible: true,
    })
  }

  bulkCloseModal = () => {
    this.setState({
      bulkModalVisible: false
    })
  }

  openModal = (id) => {
    this.setState({
      mediaId: id,
      modalVisible: true,
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  filterMediaType = (e) => {
    if (e.target.value === 'movie') {
      this.setState({
        currentView: 'movieResults',
        isFiltered: true,
        movieFiltered: true,
        tvFiltered: false,
      })
    } else if (e.target.value === 'tv') {
      this.setState({
        currentView: 'tvResults',
        isFiltered: true,
        movieFiltered: false,
        tvFiltered: true,
      })
    } else {
      this.setState({
        currentView: 'results',
        isFiltered: false,
        movieFiltered: false,
        tvFiltered: false,
      })
    }
  }

  handleSearch = (e) => {    
    let currentList = this.state[this.state.currentView];
    let newList = [];
    if (e.target.value !== "") {
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });

      this.setState({
        isFiltered: true,
        filteredResults: newList
      });
    } else {
      newList = currentList
      this.setState({
        isFiltered: true,
        filteredResults: newList
      })
    }
  }

  renderTypeSelect() {
    return (
      <select onChange={this.filterMediaType} aria-label='media type filter watch list'>
        <option value="all">All</option>
        <option value="movie">Movie</option>
        <option value="tv">Tv</option>
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
          <p>Search: <input type="text" className="input" onChange={this.handleSearch} /></p>

          {this.state.selectedMedia.length > 0 && 
            <button className="button" 
            onClick={this.bulkOpenModal} 
            disabled={!(this.state.selectedMedia.length > 0)}>
              Delete Selected</button>
          }
        </div>

        {!this.state.results.length &&
          <EmptyWatchList />
        }

        <ul className='watch_page__ul'>
          {!this.state.isFiltered && this.state.results.map(media => {
            if (media.media_type === 'movie') { 
              return (
                <WatchedMovie 
                  key={media.id}
                  movie={media} 
                  delete={this.openModal}
                  selectItems={this.selectItems} 
                  selectAll={this.selectAll}/>
              )
            }
            if (media.media_type === 'tv') {
              return (
                <WatchedShow 
                  key={media.id} 
                  show={media} 
                  delete={this.openModal} 
                  selectItems={this.selectItems} 
                  selectAll={this.selectAll} />
              )
            }
            return ''
          })}

          {this.state.movieFiltered  && !this.state.filteredResults && this.state.movieResults.map(media => {
              return <WatchedMovie key={media.id} movie={media} delete={this.openModal} selectItems={this.selectItems} selectAll={this.selectAll}/>
            }
          )}

          {this.state.tvFiltered && !this.state.filteredResults && this.state.tvResults.map(media => {
              return <WatchedShow key={media.id} show={media} delete={this.openModal} selectItems={this.selectItems} selectAll={this.selectAll}/>
            }
          )}

          {this.state.isFiltered && this.state.filteredResults && this.state.filteredResults.map(media => {
            if (media.media_type === 'movie') { 
              return (
                <WatchedMovie key={media.id} movie={media} delete={this.openModal}selectItems={this.selectItems} selectAll={this.selectAll}/>
              )
            }
            if (media.media_type === 'tv') {
              return (
                <WatchedShow key={media.id} show={media} delete={this.openModal} selectItems={this.selectItems} selectAll={this.selectAll}/>
              )
            }
            return ''
          })}
        </ul>

        <DeleteModal
          visible={this.state.modalVisible}
          openModal={this.openModal}
          closeModal={this.closeModal}
          handleDelete={this.deleteMedia}
          />

        <BulkDeleteModal
          visible={this.state.bulkModalVisible}
          openModal={this.bulkOpenModal}
          closeModal={this.bulkCloseModal}
          handleDelete={this.deleteSelected}
          />
      </section>
    )
  }
}