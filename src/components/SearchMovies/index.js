import {Component} from 'react'
import './index.css'
import Loader from '../Loader'
import MoviesList from '../MoviesList'

class SearchMovies extends Component {
  state = {
    isLoading: true,
    movies: [],
  }

  componentDidMount() {
    const {match} = this.props
    this.fetchMovies(match.params.searchInput)
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    if (match.params.searchInput !== prevProps.match.params.searchInput) {
      this.fetchMovies(match.params.searchInput)
    }
  }

  fetchMovies(searchInput) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=e6ce1b1c673698e6a4d62c38ea1df5ee&language=en-US&query=${searchInput}&page=1&include_adult=false`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          movies: data.results,
        })
      })
  }

  render() {
    const {movies, isLoading} = this.state

    if (isLoading) return <Loader />

    return (
      <div>
        <MoviesList movies={movies} />
      </div>
    )
  }
}

export default SearchMovies
