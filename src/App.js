import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './App.css'
import TopRated from './components/TopRated'
import Upcoming from './components/UpComing'
import SearchMovies from './components/SearchMovies'
import MovieDetails from './components/MovieDetails'
import Header from './components/Header'

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/search/:searchInput" component={SearchMovies} />
      <Route exact path="/movie/:movieId" component={MovieDetails} />

      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default App
