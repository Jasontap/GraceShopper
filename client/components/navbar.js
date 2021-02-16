import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Drawer} from '@material-ui/core'
import Cart from './Cart'
import { fetchBooks } from "../store/books";



export class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      isDrawerOpened: false, 
    }

    this.toggleDrawerStatus = this.toggleDrawerStatus.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.filterBooks = this.filterBooks.bind(this)
  }

  componentDidMount(){
    window.addEventListener('hashchange', (evt)=> {
      this.props.setBooks(evt.target.location.hash.slice(1))
    })
  }

  toggleDrawerStatus(){ 
    const isDrawerOpened = !this.state.isDrawerOpened;
    this.setState({ 
      isDrawerOpened 
    }) 
  } 

  closeDrawer(){ 
    this.setState({ 
      isDrawerOpened: false, 
    }) 
  } 

  filterBooks(){
    this.props.setBooks();
  }

  render(){
    const isDrawerOpened = this.state.isDrawerOpened
    const {handleClick, isLoggedIn, admin, books} = this.props

    return(
      <div>
        <nav>
          <div id="nav-container">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home"><h1>JWT Books</h1></Link>
              {admin ? (
                <span>
                  <Link to='/users'>View Users</Link>
                  <Link to='/add-book'>Add a Book</Link>
                </span>

              ) : (
                ''
              )}
              <Link to="/allbooks" onClick={this.filterBooks}>All Books</Link>
              <a href='#fiction'>Fiction</a>
              <a href="#non-fiction">Non-Fiction</a>
              <a href="#mycart" onClick={this.toggleDrawerStatus}>Shopping Cart (number)</a>
                <Drawer 
                  variant="temporary"
                  anchor="right"
                  open={isDrawerOpened}
                  onClose={this.closeDrawer} 
                >
                  <Cart />

                </Drawer>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/allbooks"><h1>JWT Books</h1></Link>
              <a href="#mycart" onClick={this.toggleDrawerStatus}>Shopping Cart (number)</a>
              <Drawer 
                variant="temporary"
                anchor="right"
                open={isDrawerOpened}
                onClose={this.closeDrawer} 
              >
                <Cart />

              </Drawer>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          <div className="icon">
            <i className="fas fa-child fa-2x"></i>
          </div>
          
          {/* <div>
          <hr />
          </div> */}

          </div>

        </nav>
      </div>
    )
  }
}

const mapState = ({ books, auth }) => {
  return {
    isLoggedIn: !!auth.id,
    admin: auth.adminAuth,
    books: books.books
  }
}

const mapDispatch = dispatch => {
  return {
    setBooks: (genre) => dispatch(fetchBooks(genre)),
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
