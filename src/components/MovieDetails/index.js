import {Component} from 'react'
import './index.css'
import Loader from '../Loader'

class MovieDetails extends Component {
  state = {
    isLoading: true,
    movieDetails: {},
    movieCast: [],
  }

  componentDidMount() {
    const {match} = this.props
    this.fetchMovieDetails(match.params.movieId)
    this.fetchMovieCast(match.params.movieId)
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    if (match.params.movieId !== prevProps.match.params.movieId) {
      this.fetchMovieDetails(match.params.movieId)
      this.fetchMovieCast(match.params.movieId)
    }
  }

  fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=e6ce1b1c673698e6a4d62c38ea1df5ee&language=en-US`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          movieDetails: data,
        })
      })
  }

  fetchMovieCast(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e6ce1b1c673698e6a4d62c38ea1df5ee`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          movieCast: data,
        })
      })
  }

  render() {
    const {isLoading, movieDetails, movieCast} = this.state
    if (isLoading) return <Loader />

    return (
      <div className="movie-details-page">
        <div className="movie-details-container">
          <div className="movie-details-info-container">
            <div className="movie-details-info-info">
              <div className="movie-details-info-info-image-container">
                <img
                  className="movie-details-info-info-image"
                  src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
              </div>
              <div className="movie-details-info-info-text">
                <h1 className="movie-details-info-info-text-title">
                  {movieDetails.title}
                </h1>
                <p className="movie-details-info-info-text-rating">
                  Rating: {movieDetails.vote_average.toFixed(1)}
                </p>
                <div className="movie-details-info-info-text-genre-container">
                  <p className="movie-details-info-info-text-runtime">
                    {movieDetails.runtime} min
                  </p>
                  <p className="movie-details-info-info-text-genre">
                    {movieDetails.genres.map(genre => genre.name).join(', ')}
                  </p>
                </div>
                <p className="movie-details-info-info-text-release-date">
                  Release Date:{' '}
                  {new Date(movieDetails.release_date).toDateString()}
                </p>
              </div>
            </div>
            <div className="movie-details-info-overview">
              <h2 className="movie-details-info-overview-title">Overview</h2>
              <p className="movie-details-info-overview-text">
                {movieDetails.overview}
              </p>
            </div>
          </div>
          <div className="movie-details-backdrop-container">
            <img
              className="movie-details-backdrop"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
            />
          </div>
        </div>

        <div className="movie-details-cast-container">
          <h2 className="movie-details-cast-title">Cast</h2>
          <div className="movie-details-cast">
            {movieCast.cast &&
              movieCast.cast.map(cast => (
                <div className="movie-details-cast-member" key={cast.id}>
                  {cast.profile_path !== null && (
                    <img
                      className="movie-details-cast-member-image"
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.name}
                    />
                  )}

                  {cast.profile_path === null && (
                    <img
                      className="movie-details-cast-member-image"
                      src="https://via.placeholder.com/200x300?text=No+Image"
                      alt={cast.name}
                    />
                  )}

                  <div className="movie-details-cast-member-info">
                    <h3 className="movie-details-cast-member-info-name">
                      {cast.name}
                    </h3>
                    <p className="movie-details-cast-member-info-character">
                      Character {cast.character}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetails
