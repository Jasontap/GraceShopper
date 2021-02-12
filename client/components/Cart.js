import React from "react"
import { connect } from "react-redux"
import { getCart, removeFromCart } from '../store/cart'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom";

export class Cart extends React.Component{
  componentDidMount(){
    const userId = this.props.auth.id;
    if(userId){
      this.props.getCart(userId);
    }
  }
  render(){
    const cart = this.props.cart
    const userId = this.props.auth.id
    return(
      <div>
        <h1>CART</h1>
        {
          this.props.usercart.length === 0?
          <div className="cart-card"><p>Your cart is Empty. <a href='/allbooks'>Shop?</a></p></div> :
          this.props.usercart.map(item => {
            return(
              <div key={item.id} className="cart-card">
                <h4>{item.book}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Cost: {item.quantity * item.price}</p>
                <Button onClick={()=>this.props.removeFromCart(item)}>Remove from Cart</Button>
              </div>
            )
          })
        }
        <h4>Total: </h4>
        {
          userId?
          <Link to='/checkout'><Button disabled={!this.props.usercart.length}>Check Out</Button></Link> :
          <div id="guest-options">
            <p>You are not logged in.</p>
            <Link to='/checkout'><p>Check Out As Guest</p></Link>
            <Link to='/login'><p>Login</p></Link>
            <Link to='/signup'><p>Sign-Up</p></Link>
          </div>
          }

      </div>
    )
  }
}

const mapState = ({cart,auth}) => {
  const usercart = cart.filter(line=>line.userId === auth.id)
  return {usercart, auth};
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId)=> dispatch(getCart(userId)),
    removeFromCart: (book)=>dispatch(removeFromCart(book,history))
  };
};

export default connect(mapState, mapDispatch)(Cart);