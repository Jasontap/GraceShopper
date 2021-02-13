import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup, Home, AllBooks, SingleBook, Cart, Users, AddBook, CheckoutForm, SingleUser} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, admin} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path='/allbooks' component={AllBooks} />
            <Route path='/books/:id' component={SingleBook} />
            <Route path='/add-book' component={AddBook} />
            <Route path='/mycart' component={Cart} />
            <Route exact path='/users' component={Users} />
            <Route path='/users/:id' component={SingleUser} />
            <Route exact path='/fiction' component={AllBooks} />
            { !admin ? <Redirect to='/mycart'/> : <Redirect to="/home" /> }
            <Route path='/checkout' component={CheckoutForm} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/allbooks' component={AllBooks} />
            <Route path='/books/:id' component={SingleBook} />
            <Route path='/mycart' component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/allBooks" />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined as having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    admin: state.auth.adminAuth
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
