import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {setBookGenre} from '../store/books'



export class Navbar extends React.Component {
  constructor(props){
    super(props)
  }
  
  render(){
    const isLoggedIn = this.props.isLoggedIn
    return(
      <div>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home"><h1>JWT Books</h1></Link>
              <Link to="/allbooks">All Books</Link>
              <Link to="/fiction">Fiction</Link>
              <Link to="/nonfiction">Non-Fiction</Link>
              <Link to="/mycart">Shopping Cart (number)</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/allbooks"><h1>JWT Books</h1></Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              {/* <Link>Cart</Link> */}
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
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
