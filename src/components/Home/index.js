import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'
import MoviesList from '../MoviesList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    moviesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovieDetails()
  }

  getPopularMovieDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url =
      'https://api.themoviedb.org/3/movie/popular?api_key=e6ce1b1c673698e6a4d62c38ea1df5ee&language=en-US&page=1'
    const response = await fetch(url)

    if (response && response?.ok) {
      const fetchedData = await response.json()
      this.setState({
        moviesData: fetchedData.results,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = isDarkTheme => {
    const errorImageURL = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <div>
        <img alt="failure view" src={errorImageURL} />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble completing your request. Please try again.
        </p>
        <button type="button" onClick={this.getPopularMovieDetails}>
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderMoviesListView = () => {
    const {moviesData} = this.state
    return (
      <div>
        <MoviesList movies={moviesData} />
      </div>
    )
  }

  renderMoviesData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderMoviesData()}</div>
  }
}

export default Home
