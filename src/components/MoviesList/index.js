import {Component} from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'

class MoviesList extends Component {
  render() {
    const {movies, history} = this.props
    return (
      <ul className="movies-container">
        {movies.map(movie => (
          <li className="movie-container" key={movie.id}>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info-container">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
            </div>

            <button
              className="movie-button"
              onClick={() => {
                history.push(`/movie/${movie.id}`)
              }}
              type="button"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default withRouter(MoviesList)
