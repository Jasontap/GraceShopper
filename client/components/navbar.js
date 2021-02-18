import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Drawer} from '@material-ui/core'
import Cart from './Cart'
import { fetchBooks, fetchGenres } from "../store/books";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from 'react-bootstrap/Dropdown'
import history from '../history'


export class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      isDrawerOpened: false,
      anchorEl: false,
      showMenu: false
    }

    this.toggleDrawerStatus = this.toggleDrawerStatus.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.resetAllBooks = this.resetAllBooks.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount(){
    this.props.setGenres();
    window.addEventListener('hashchange', ()=> {
      if(window.location.hash.slice(1) !== 'mycart'){
        this.props.setBooks(window.location.hash.slice(1))
      }
    })
    if(window.location.hash.slice(1) !== 'mycart'){
      this.props.setBooks(window.location.hash.slice(1))
    }
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
  
  resetAllBooks(){
    this.props.setBooks();
  }

  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  };

  handleClose() {
    this.setState({
      anchorEl: false
    })
  };

  render(){
    const { isDrawerOpened, anchorEl } = this.state
    const {handleClick, isLoggedIn, admin, genres } = this.props


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
                <Link to="/allbooks" onClick={this.resetAllBooks}>All Books</Link>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
                  Select A Genre
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  {
                    genres.map(genre => {
                      const genreTag = genre.split(' ').join('');
                      return (
                        <MenuItem onClick={this.handleClose} key={genre}>
                        <a href={`#${genreTag}`}>{genre}</a>
                        </MenuItem> 
                      )
                    })
                  }
                </Menu>
                <a href="#mycart" onClick={this.toggleDrawerStatus}>Shopping Cart</a>
                  <Drawer 
                    variant="temporary"
                    anchor="right"
                    open={isDrawerOpened}
                    onClose={this.closeDrawer} 
                  >
                    <Cart />

                  </Drawer>
                {/* <a href="#" onClick={handleClick}>
                  Logout
                </a> */}
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/allbooks" onClick={this.resetAllBooks}><h1>JWT Books</h1></Link>
                <Link to="/allbooks" onClick={this.resetAllBooks}>All Books</Link>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleMenuClick}>
                  Select A Genre
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  {
                    genres.map(genre => {
                      const genreTag = genre.split(' ').join('');
                      return (
                        <MenuItem onClick={this.handleClose} key={genre}>
                        <a href={`#${genreTag}`}>{genre}</a>
                        </MenuItem> 
                      )
                    })
                  }
                </Menu>
                <a href="#mycart" onClick={this.toggleDrawerStatus}>Shopping Cart</a>
                <Drawer 
                  variant="temporary"
                  anchor="right"
                  open={isDrawerOpened}
                  onClose={this.closeDrawer} 
                >
                  <Cart history={history}/>

                </Drawer>
                {/* <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link> */}
              </div>
            )}

            <Dropdown>
              <Dropdown.Toggle id="dropdown">
                <div className="icon">
                  <i className="fas fa-child fa-2x"></i>
                </div>
              </Dropdown.Toggle>
              {
                isLoggedIn?(
                  <Dropdown.Menu>
                    <Dropdown.Item >
                      <Link to='/orders'>Order History</Link>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleClick}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )
                :
                (
                  <Dropdown.Menu>
                    <Dropdown.Item href="/login">
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item href="/signup">
                      Sign Up
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )
              }
            </Dropdown>
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
    genres: books.genres
  }
}

const mapDispatch = dispatch => {
  return {
    setBooks: (genre) => dispatch(fetchBooks(genre)),
    setGenres: () => dispatch(fetchGenres()),
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
