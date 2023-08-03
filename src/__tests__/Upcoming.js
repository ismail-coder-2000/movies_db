import {BrowserRouter} from 'react-router-dom'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const upcomingMoviesURL = 'https://api.themoviedb.org/3/movie/upcoming'

const upcomingMovies = {
  results: [
    {
      adult: false,
      backdrop_path: '/cSYLX73WskxCgvpN3MtRkYUSj1T.jpg',
      genre_ids: [16, 35, 10751, 14, 10749],
      id: 976573,
      original_language: 'en',
      original_title: 'Elemental',
      overview:
        'In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.',
      popularity: 1391.675,
      poster_path: '/8riWcADI1ekEiBguVB9vkilhiQm.jpg',
      release_date: '2023-06-14',
      title: 'Elemental',
      video: false,
      vote_average: 7.5,
      vote_count: 304,
    },
    {
      adult: false,
      backdrop_path: '/u17VLZqWFbeJsj1HpvB6QOOHvlC.jpg',
      genre_ids: [14, 28, 12],
      id: 455476,
      original_language: 'en',
      original_title: 'Knights of the Zodiac',
      overview:
        'When a headstrong street orphan, Seiya, in search of his abducted sister unwittingly taps into hidden powers, he discovers he might be the only person alive who can protect a reincarnated goddess, sent to watch over humanity. Can he let his past go and embrace his destiny to become a Knight of the Zodiac?',
      popularity: 1712.12,
      poster_path: '/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg',
      release_date: '2023-04-27',
      title: 'Knights of the Zodiac',
      video: false,
      vote_average: 6.5,
      vote_count: 280,
    },
    {
      adult: false,
      backdrop_path: '/osnvZffaZymubHiBkOsIFd8Y3Re.jpg',
      genre_ids: [28, 27, 53],
      id: 986070,
      original_language: 'en',
      original_title: 'The Wrath of Becky',
      overview:
        'Two years after she escaped a violent attack on her family, 16-year-old Becky attempts to rebuild her life in the care of an older woman -- a kindred spirit named Elena. However, when a violent group known as the Noble Men break into their home, attack them and take their beloved dog, Becky must return to her old ways to protect herself and her loved ones.',
      popularity: 984.626,
      poster_path: '/3LShl6EwqptKIVq6NWOZ0FbZHEe.jpg',
      release_date: '2023-05-26',
      title: 'The Wrath of Becky',
      video: false,
      vote_average: 6.7,
      vote_count: 62,
    },
    {
      adult: false,
      backdrop_path: '/vQ5T84t8h4N2xAswNFW9fkVIyZq.jpg',
      genre_ids: [9648, 53, 878],
      id: 536437,
      original_language: 'en',
      original_title: 'Hypnotic',
      overview:
        'A detective becomes entangled in a mystery involving his missing daughter and a secret government program while investigating a string of reality-bending crimes.',
      popularity: 904.106,
      poster_path: '/3IhGkkalwXguTlceGSl8XUJZOVI.jpg',
      release_date: '2023-05-11',
      title: 'Hypnotic',
      video: false,
      vote_average: 6.3,
      vote_count: 276,
    },
    {
      adult: false,
      backdrop_path: '/fEe2csLOUsTyaLdCccVJfFeJzhx.jpg',
      genre_ids: [878, 28, 12],
      id: 298618,
      original_language: 'en',
      original_title: 'The Flash',
      overview:
        "When his attempt to save his family inadvertently alters the future, Barry Allen becomes trapped in a reality in which General Zod has returned and there are no Super Heroes to turn to. In order to save the world that he is in and return to the future that he knows, Barry's only hope is to race for his life. But will making the ultimate sacrifice be enough to reset the universe?",
      popularity: 915.012,
      poster_path: '/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
      release_date: '2023-06-13',
      title: 'The Flash',
      video: false,
      vote_average: 6.7,
      vote_count: 716,
    },
    {
      adult: false,
      backdrop_path: '/9t0tJXcOdWwwxmGTk112HGDaT0Q.jpg',
      genre_ids: [27, 53],
      id: 890771,
      original_language: 'en',
      original_title: 'The Black Demon',
      overview:
        'Oilman Paul Sturges idyllic family vacation turns into a nightmare when they encounter a ferocious megalodon shark that will stop at nothing to protect its territory. Stranded and under constant attack, Paul and his family must somehow find a way to get his family back to shore alive before it strikes again in this epic battle between humans and nature.',
      popularity: 673.629,
      poster_path: '/uiFcFIjig0YwyNmhoxkxtAAVIL2.jpg',
      release_date: '2023-04-26',
      title: 'The Black Demon',
      video: false,
      vote_average: 6.3,
      vote_count: 257,
    },
  ],
}

const server = setupServer(
  rest.get(upcomingMoviesURL, (req, res, ctx) => res(ctx.json(upcomingMovies))),
)

const renderWithBrowserRouter = (ui = <App />, {route = '/upcoming'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

describe('Upcoming Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  afterEach(() => {
    server.resetHandlers()
  })
  it('When the Page is opened, an HTTP GET request should be made to the given "upcomingMoviesURL" to get the list of all upcoming movies:::5:::', async () => {
    const promise = Promise.resolve(upcomingMovies)
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (!url.includes('api_key')) {
        return Promise.resolve({
          ok: false,
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

  it('When the HTTP GET request is successful and the active page is "Upcoming", then the page should consist of an HTML image element with src as the value of the key "poster_path" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(upcomingMovies)
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (!url.includes('api_key')) {
        return Promise.resolve({
          ok: false,
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
    const dishImages = upcomingMovies.results
    let count = 0
    for (let i = 0; i < 6; i += 1) {
      for (let j = 0; j < srcValues.length; j += 1) {
        const regex = new RegExp(
          `https://image.tmdb.org/t/p/w[0-9]+${dishImages[i].poster_path}`,
        )
        if (regex.test(srcValues[j])) {
          count += 1
        }
      }
    }
    expect(count).toBeGreaterThanOrEqual(6)
  })

  it('When the HTTP GET request is successful and the active page is "Upcoming", then the page should consist of an HTML element with text content as "title" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(upcomingMovies)
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (!url.includes('api_key')) {
        return Promise.resolve({
          ok: false,
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
        new RegExp(`^${upcomingMovies.results[0].title}$`, 'i'),
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    for (let i = 0; i < 6; i += 1) {
      const paragraphEl = screen.getByText(
        new RegExp(`^${upcomingMovies.results[i].title}$`, 'i'),
        {
          exact: false,
        },
      )
      expect(paragraphEl).toBeInTheDocument()
    }
  })

  it('When the HTTP GET request is successful and the active page is "Upcoming", then the page should consist of an HTML element with text content as value of the key "vote_average" received from the response within "results" list:::5:::', async () => {
    const promise = Promise.resolve(upcomingMovies)
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (!url.includes('api_key')) {
        return Promise.resolve({
          ok: false,
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
        new RegExp(`^${upcomingMovies.results[0].title}$`, 'i'),
        {
          exact: false,
        },
      ),
    ).toBeInTheDocument()

    for (let i = 0; i < 6; i += 1) {
      const ratings = screen.getAllByText(
        new RegExp(`${upcomingMovies.results[i].vote_average}`, 'i'),
        {
          exact: false,
        },
      )
      expect(ratings[0]).toBeInTheDocument()
    }
  })

  it('When the HTTP GET request is successful and the active page is "Upcoming", then the page should consist of an HTML button element with text content as "View Details":::5:::', async () => {
    const promise = Promise.resolve(upcomingMovies)
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (!url.includes('api_key')) {
        return Promise.resolve({
          ok: false,
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
