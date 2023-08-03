import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="notfound-div">
      <h1 className="notfound-hd">Page Not Found</h1>
      <p className="notfound-para">
        we are sorry, the page you requested could not be found,
        <br /> Please go back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="logout-btn">
          Go Back to Home
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
