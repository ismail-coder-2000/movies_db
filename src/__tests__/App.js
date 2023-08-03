import {BrowserRouter} from 'react-router-dom'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const getPopularMoviesURL = 'https://api.themoviedb.org/3/movie/popular'

const popularMovies = {
  results: [
    {
      adult: false,
      backdrop_path: '/e2Jd0sYMCe6qvMbswGQbM0Mzxt0.jpg',
      genre_ids: [28, 80, 53],
      id: 385687,
      original_language: 'en',
      original_title: 'Fast X',
      overview:
        "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced",
      popularity: 3811.029,
      poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      release_date: '2023-05-17',
      title: 'Fast X',
      video: false,
      vote_average: 7.3,
      vote_count: 2184,
    },
    {
      adult: false,
      backdrop_path: '/fhquRW28vRZHr26orSaFFnhYIA0.jpg',
      genre_ids: [28, 53],
      id: 697843,
      original_language: 'en',
      original_title: 'Extraction 2',
      overview:
        "Tasked with extracting a family who is at the mercy of a Georgian gangster, Tyler Rake infiltrates one of the world's deadliest prisons in order to save them.",
      popularity: 2001.538,
      poster_path: '/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg',
      release_date: '2023-06-09',
      title: 'Extraction 2',
      video: false,
      vote_average: 7.6,
      vote_count: 983,
    },
    {
      adult: false,
      backdrop_path: '/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg',
      genre_ids: [28, 12, 16, 878],
      id: 569094,
      original_language: 'en',
      original_title: 'Spider-Man: Across the Spider-Verse',
      overview:
        'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence.',
      popularity: 1786.715,
      poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      release_date: '2023-05-31',
      title: 'Spider-Man: Across the Spider-Verse',
      video: false,
      vote_average: 8.6,
      vote_count: 1846,
    },
    {
      adult: false,
      backdrop_path: '/fgw4rFs4XMWdJTWp1eMacHKQqbZ.jpg',
      genre_ids: [28, 53, 80],
      id: 603692,
      original_language: 'en',
      original_title: 'John Wick: Chapter 4',
      overview:
        'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
      popularity: 1715.856,
      poster_path: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
      release_date: '2023-03-22',
      title: 'John Wick: Chapter 4',
      video: false,
      vote_average: 7.9,
      vote_count: 3390,
    },
    {
      adult: false,
      backdrop_path: '/nniZPBIfrep9wbx0l1529RHXeD8.jpg',
      genre_ids: [16, 10751, 12, 14, 35],
      id: 502356,
      original_language: 'en',
      original_title: 'The Super Mario Bros. Movie',
      overview:
        'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
      popularity: 1457.516,
      poster_path: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
      release_date: '2023-04-05',
      title: 'The Super Mario Bros. Movie',
      video: false,
      vote_average: 7.8,
      vote_count: 5221,
    },
    {
      adult: false,
      backdrop_path: '/qWQSnedj0LCUjWNp9fLcMtfgadp.jpg',
      genre_ids: [28, 12, 878],
      id: 667538,
      original_language: 'en',
      original_title: 'Transformers: Rise of the Beasts',
      overview:
        'When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.',
      popularity: 1431.382,
      poster_path: '/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
      release_date: '2023-06-06',
      title: 'Transformers: Rise of the Beasts',
      video: false,
      vote_average: 7.1,
      vote_count: 496,
    },
  ],
}

const server = setupServer(
  rest.get(getPopularMoviesURL, (req, res, ctx) =>
    res(ctx.json(popularMovies)),
  ),
)

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe('Home Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('When the Page is opened, an HTTP GET request should be made to the given "getPopularMoviesURL" to get the list of all popular movies :::10:::', async () => {
    const promise = Promise.resolve(popularMovies)
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

  it('When the HTTP GET request is successful, then the page should consist of an HTML heading element with text content as "movieDB":::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => promise,
    }))
    window.fetch = mockFetchFunction

    renderWithBrowserRouter(<App />)

    const headingEl = await screen.getByRole('heading', {
      name: /movieDB/i,
      exact: false,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it('When the HTTP GET request is successful, then the page should consist of an HTML heading element with text content as "Popular":::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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

    expect(screen.getByText(/Popular/i)).toBeInTheDocument()

    expect(mockFetchFunction).toReturnWith(
      Promise.resolve({
        ok: true,
      }),
    )
  })

  it('When the HTTP GET request is successful, then the page should consist of an HTML heading element with text content as "Top Rated":::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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
      screen.getByText(/Top Rated/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it('When the HTTP GET request is successful, then the page should consist of an HTML heading element with text content as "Upcoming":::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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
      screen.getByText(/Upcoming/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it('When the HTTP GET request is successful, then the page should consist of an HTML search input element:::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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
    expect(searchEl).toBeInTheDocument()
  })

  it('When the HTTP GET request is successful, then the page should consist of an HTML button element with text content as "Search":::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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
    const buttonEls = screen.getByRole('button', {name: /Search/i})
    expect(buttonEls).toBeInTheDocument()
  })

  it('When the HTTP GET request is successful and the active page is "Popular", then the page should consist of an HTML image element with src as the value of the key "poster_path" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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
    const movieImages = popularMovies.results
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

  it('When the HTTP GET request is successful and the active page is "Popular", then the page should consist of an HTML element with text content as "title" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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
        new RegExp(`^${popularMovies.results[0].title}$`, 'i'),
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    for (let i = 0; i < 6; i += 1) {
      const paragraphEl = screen.getByText(
        new RegExp(`^${popularMovies.results[i].title}$`, 'i'),
        {
          exact: false,
        },
      )
      expect(paragraphEl).toBeInTheDocument()
    }
  })

  it('When the HTTP GET request is successful and the active page is "Popular", then the page should consist of an HTML element with text content as value of the key "vote_average" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
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
        new RegExp(`^${popularMovies.results[0].title}$`, 'i'),
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    expect(
      await screen.findByText(
        new RegExp(`^${popularMovies.results[0].title}$`, 'i'),
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    for (let i = 0; i < 6; i += 1) {
      const ratings = screen.getAllByText(
        new RegExp(`${popularMovies.results[i].vote_average}`, 'i'),
        {
          exact: false,
        },
      )
      expect(ratings[0]).toBeInTheDocument()
    }
  })

  it('When the HTTP GET request is successful and the active page is "Popular", then the page should consist of an HTML button element with text content as "View Details":::5:::', async () => {
    const promise = Promise.resolve(popularMovies)
    const mockFetchFunction = jest.fn().mockImplementation(() => ({
      ok: true,
      json: () => promise,
    }))
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)

    const viewDetailsButtons = await screen.findAllByRole('button', {
      name: /View Details/i,
      exact: false,
    })
    expect(viewDetailsButtons.length).toBeGreaterThanOrEqual(6)
  })
})
