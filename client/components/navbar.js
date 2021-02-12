import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {setBookGenre} from '../store/books'
import {Drawer} from '@material-ui/core'
import Cart from './Cart'



export class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      isDrawerOpened: false, 
    }

    this.toggleDrawerStatus = this.toggleDrawerStatus.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
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
  
  render(){
    const isLoggedIn = this.props.isLoggedIn
    const isDrawerOpened = this.state.isDrawerOpened
    return(
      <div>
        <nav>
          <div id="nav-container">
          {isLoggedIn ? (
            <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home"><h1>JWT Books</h1></Link>
                <Link to="/allbooks">All Books</Link>
                <Link to="/fiction">Fiction</Link>
                <Link to="/nonfiction">Non-Fiction</Link>
                <a href="#mycart" onClick={this.toggleDrawerStatus}>Shopping Cart (number)</a>
                <Drawer 
                  variant="temporary"
                  anchor="right"
                  open={isDrawerOpened}
                  onClose={this.closeDrawer} 
                >
                  <Cart />

                </Drawer>
                <a href="#" onClick={this.props.handleClick}>
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
          </div>
          <i class="fas fa-child fa-2x"></i>
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
