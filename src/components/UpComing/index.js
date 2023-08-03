import {Component} from 'react'
import './index.css'
import Loader from '../Loader'
import MoviesList from '../MoviesList'

class UpComing extends Component {
  state = {
    isLoading: true,
    movies: [],
  }

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=e6ce1b1c673698e6a4d62c38ea1df5ee&language=en-US&page=1`
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
    const {isLoading, movies} = this.state

    if (isLoading) return <Loader />

    return (
      <div>
        <MoviesList movies={movies} />
      </div>
    )
  }
}

export default UpComing
