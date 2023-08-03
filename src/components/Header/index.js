import {Component} from 'react'
import './index.css'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component {
  state = {
    searchInput: '',
  }

  componentDidMount() {}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchMovies = () => {
    const {searchInput} = this.state
    const {history} = this.props
    const urlEncodedSearchString = encodeURIComponent(searchInput)
    history.push(`/search/${urlEncodedSearchString}`)
  }

  render() {
    const {searchInput} = this.state
    return (
      <header className="header-container">
        <div className="header-title-container">
          <h1 className="header-title">movieDB</h1>
        </div>
        <div className="header-links-container">
          <Link className="header-link" to="/">
            Popular
          </Link>
          <Link className="header-link" to="/top-rated">
            Top Rated
          </Link>
          <Link className="header-link" to="/upcoming">
            Upcoming
          </Link>
          <input
            type="text"
            placeholder="Search Movies"
            className="header-search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            className="header-search-button"
            onClick={this.onSearchMovies}
            type="button"
          >
            Search
          </button>
        </div>
      </header>
    )
  }
}

export default withRouter(Header)
