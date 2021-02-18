import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'

export class Cart extends React.Component{

  render(){
    const userId = this.props.auth.id
    return(
      <div>
        {
          userId?
          <ul>
            <li><a>Order History</a></li>
            <li><a href="#" onClick={handleClick}>Logout</a></li>
          </ul>
          :
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>

        }

      </div>
    )
  }
}
const mapState = ({auth})=>{
  return {
    auth
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(AllBooks);