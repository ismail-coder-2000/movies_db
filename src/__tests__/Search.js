import {BrowserRouter} from 'react-router-dom'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const searchMoviesURL = 'https://api.themoviedb.org/3/search/movie'

const searchMovies = {
  results: [
    {
      adult: false,
      backdrop_path: '/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg',
      genre_ids: [28, 80, 53],
      id: 385687,
      original_language: 'en',
      original_title: 'Fast X',
      overview:
        "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and ",
      popularity: 2081.04,
      poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      release_date: '2023-05-17',
      title: 'Fast X',
      video: false,
      vote_average: 7.357,
      vote_count: 2655,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [28, 35],
      id: 391559,
      original_language: 'en',
      original_title: 'Fast',
      overview:
        'A balls to the wall action film about Fast, the fastest person alive, who is also named Fast.',
      popularity: 0.919,
      poster_path: '/p8c0a159yKnpciQCFsR8BaC23po.jpg',
      release_date: '2010-06-24',
      title: 'Fast',
      video: false,
      vote_average: 3.25,
      vote_count: 2,
    },
  ],
}

const server = setupServer(
  rest.get(searchMoviesURL, (req, res, ctx) => res(ctx.json(searchMovies))),
)

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe('Search Movies Test', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('When the HTTP GET request is successful and an input is given in Search bar and "Search" button is clicked, the page should display the movies fetched from the Search API:::5:::', async () => {
    const promise = Promise.resolve(searchMovies)
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (!url.includes('api_key')) {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({}),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => promise,
      })
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)

    const searchEl = await screen.findByRole('textbox')
    const searchButtonEl = screen.getAllByRole('button', {
      name: /Search/i,
      exact: false,
    })[0]
    userEvent.type(searchEl, 'Fast')
    userEvent.click(searchButtonEl)

    const title1 = await screen.findByRole('heading', {
      name: searchMovies.results[0].title,
      exact: false,
    })
    const title2 = await screen.findByRole('heading', {
      name: searchMovies.results[1].title,
      exact: false,
    })

    expect(title1).toBeInTheDocument()
    expect(title2).toBeInTheDocument()
  })
})
