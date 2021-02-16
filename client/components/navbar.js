import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Drawer} from '@material-ui/core'
import Cart from './Cart'
import Dropdown from 'react-bootstrap/Dropdown'


export class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      isDrawerOpened: false,
      showMenu: false
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
    const isDrawerOpened = this.state.isDrawerOpened
    const {handleClick, isLoggedIn, admin} = this.props
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
              <Link to="/allbooks">All Books</Link>
              <Link to='/fiction'>Fiction</Link>
              <Link to="/nonfiction">Non-Fiction</Link>
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
              <Link to="/allbooks"><h1>JWT Books</h1></Link>
              <a href="#mycart" onClick={this.toggleDrawerStatus}>Shopping Cart</a>
              <Drawer 
                variant="temporary"
                anchor="right"
                open={isDrawerOpened}
                onClose={this.closeDrawer} 
              >
                <Cart />

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
              <Dropdown.Item>
                Order History
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
          
          {/* <div>
          <hr />
          </div> */}

          </div>

        </nav>
      </div>
    )
  }
}

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
