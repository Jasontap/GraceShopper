import React from "react"
import { connect } from "react-redux"
import { getCart, removeFromCart } from '../store/cart'
import Button from '@material-ui/core/Button'

export class Cart extends React.Component{
  componentDidMount(){
    const userId = this.props.auth.id;
    this.props.getCart(userId);
  }
  render(){
    const cart = this.props.cart
    return(
      <div>
        <h1>CART</h1>
        {
          cart.length === 0?
          <p>Your cart is Empty. Shop?</p> :
          cart.map(item => {
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
        <Button disabled={!cart.length}>Check Out</Button>

      </div>
    )
  }
}

const mapState = ({cart,auth}) => {
  return {cart, auth};
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId)=> dispatch(getCart(userId)),
    removeFromCart: (book)=>dispatch(removeFromCart(book,history))
  };
};

export default connect(mapState, mapDispatch)(Cart);