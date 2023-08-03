import {BrowserRouter} from 'react-router-dom'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const topRatedMoviesURL = 'https://api.themoviedb.org/3/movie/top_rated'

const topRatedMovies = {
  results: [
    {
      adult: false,
      backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
      genre_ids: [18, 80],
      id: 238,
      original_language: 'en',
      original_title: 'The Godfather',
      overview:
        'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.',
      popularity: 131.827,
      poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      release_date: '1972-03-14',
      title: 'The Godfather',
      video: false,
      vote_average: 8.7,
      vote_count: 18162,
    },
    {
      adult: false,
      backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
      genre_ids: [18, 80],
      id: 278,
      original_language: 'en',
      original_title: 'The Shawshank Redemption',
      overview:
        'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
      popularity: 90.655,
      poster_path: '/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
      release_date: '1994-09-23',
      title: 'The Shawshank Redemption',
      video: false,
      vote_average: 8.7,
      vote_count: 24044,
    },
    {
      adult: false,
      backdrop_path: '/kGzFbGhp99zva6oZODW5atUtnqi.jpg',
      genre_ids: [18, 80],
      id: 240,
      original_language: 'en',
      original_title: 'The Godfather Part II',
      overview:
        'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.',
      popularity: 78.265,
      poster_path: '/bMadFzhjy9T7R8J48QGq1ngWNAK.jpg',
      release_date: '1974-12-20',
      title: 'The Godfather Part II',
      video: false,
      vote_average: 8.6,
      vote_count: 10960,
    },
    {
      adult: false,
      backdrop_path: '/vI3aUGTuRRdM7J78KIdW98LdxE5.jpg',
      genre_ids: [35, 18, 10749],
      id: 19404,
      original_language: 'hi',
      original_title: 'दिलवाले दुल्हनिया ले जायेंगे',
      overview:
        'Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.',
      popularity: 28.927,
      poster_path: '/ktejodbcdCPXbMMdnpI9BUxW6O8.jpg',
      release_date: '1995-10-20',
      title: 'Dilwale Dulhania Le Jayenge',
      video: false,
      vote_average: 8.6,
      vote_count: 4157,
    },
    {
      adult: false,
      backdrop_path: '/zb6fM1CX41D9rF9hdgclu0peUmy.jpg',
      genre_ids: [18, 36, 10752],
      id: 424,
      original_language: 'en',
      original_title: "Schindler's List",
      overview:
        'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.',
      popularity: 50.762,
      poster_path: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
      release_date: '1993-12-15',
      title: "Schindler's List",
      video: false,
      vote_average: 8.6,
      vote_count: 14210,
    },
    {
      adult: false,
      backdrop_path: '/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg',
      genre_ids: [28, 12, 16, 878],
      id: 569094,
      original_language: 'en',
      original_title: 'Spider-Man: Across the Spider-Verse',
      overview:
        'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the ',
      popularity: 1848.739,
      poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      release_date: '2023-05-31',
      title: 'Spider-Man: Across the Spider-Verse',
      video: false,
      vote_average: 8.6,
      vote_count: 1965,
    },
  ],
}

const server = setupServer(
  rest.get(topRatedMoviesURL, (req, res, ctx) => res(ctx.json(topRatedMovies))),
)

const renderWithBrowserRouter = (ui = <App />, {route = '/top-rated'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe('Top Rated Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('When the Page is opened, an HTTP GET request should be made to the given "topRatedMoviesURL" to get the list of all top rated movies:::5:::', async () => {
    const promise = Promise.resolve(topRatedMovies)
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
    expect(mockFetchFunction).toReturnWith(
      Promise.resolve({
        ok: true,
      }),
    )
    await act(() => promise)
  })

  it('When the HTTP GET request is successful and the active page is "Top Rated", then the page should consist of an HTML image element with src as the value of the key "poster_path" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(topRatedMovies)
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
    const images = await screen.findAllByRole('img')
    const srcValues = images.map(image => image.getAttribute('src'))
    const movieImages = topRatedMovies.results
    let count = 0
    for (let i = 0; i < 6; i += 1) {
      for (let j = 0; j < srcValues.length; j += 1) {
        const regex = new RegExp(
          `https://image.tmdb.org/t/p/w[0-9]+${movieImages[i].poster_path}`,
        )
        if (regex.test(srcValues[j])) {
          count += 1
        }
      }
    }
    expect(count).toBeGreaterThanOrEqual(6)
  })

  it('When the HTTP GET request is successful and the active page is "Top Rated", then the page should consist of an HTML element with text content as "title" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(topRatedMovies)
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

    expect(
      await screen.findByText(
        new RegExp(`^${topRatedMovies.results[0].title}$`, 'i'),
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    for (let i = 0; i < 6; i += 1) {
      const paragraphEl = screen.getByText(
        new RegExp(`^${topRatedMovies.results[i].title}$`, 'i'),
        {
          exact: false,
        },
      )
      expect(paragraphEl).toBeInTheDocument()
    }
  })

  it('When the HTTP GET request is successful and the active page is "Top Rated", then the page should consist of an HTML element with text content as value of the key "vote_average" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(topRatedMovies)
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

    expect(
      await screen.findByText(
        new RegExp(`^${topRatedMovies.results[0].title}$`, 'i'),
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    for (let i = 0; i < 6; i += 1) {
      const ratings = screen.getAllByText(
        new RegExp(`${topRatedMovies.results[i].vote_average}`, 'i'),
        {
          exact: false,
        },
      )
      expect(ratings[0]).toBeInTheDocument()
    }
  })

  it('When the HTTP GET request is successful and the active page is "Top Rated", then the page should consist of an HTML button element with text content as "View Details":::5:::', async () => {
    const promise = Promise.resolve(topRatedMovies)
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

    const viewDetailsButtons = await screen.findAllByRole('button', {
      name: /View Details/i,
      exact: false,
    })
    expect(viewDetailsButtons.length).toBeGreaterThanOrEqual(6)
  })
})
