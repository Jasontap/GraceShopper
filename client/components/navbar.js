import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
<<<<<<< HEAD


=======
// import {setBookGenre} from '../store/books'

>>>>>>> cba9f27... Added admin users to seed function. Added admin/standard-user filter for nav bar.
const Navbar = ({handleClick, isLoggedIn, admin}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home"><h1>JWT Books</h1></Link>
          {admin ? (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d26341b... Admin can add New Books to database
            <div>
              <Link to='/users'>View Users</Link>
              <Link to='/add-book'>Add a Book</Link>
            </div>
<<<<<<< HEAD
          ) : (
            ''
=======
            <Link to='/users'>View Users</Link>
          ) : (
            <span></span>
>>>>>>> cba9f27... Added admin users to seed function. Added admin/standard-user filter for nav bar.
=======
          ) : (
            ''
>>>>>>> d26341b... Admin can add New Books to database
          )}
          <Link to="/allbooks">All Books</Link>
          <Link to='/fiction'>Fiction</Link>
          <Link to="/nonfiction">Non-Fiction</Link>
          <Link to="/mycart">Shopping Cart (number)</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    admin: state.auth.adminAuth
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
