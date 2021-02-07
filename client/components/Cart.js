import React from "react"
import { connect } from "react-redux"
import { getCart, removeFromCart } from '../store/cart'

export class Cart extends React.Component{
  componentDidMount(){
    this.props.getCart(2)
  }
  render(){
    const cart = this.props.cart
    console.log(this.props.cart)
    return(
      <div>
        <h1>CART</h1>
        {
          cart.length === 0?
          <p>Your cart is Empty. Shop?</p> :
          cart.map(item => {
            return(
              <div key={item.id}>
                <h4>Title: {item.book}</h4>
                <p>Quantity: {item.quantity}</p>
                <button onClick={()=>this.props.removeFromCart(item)}>Remove from Cart</button>
              </div>
            )
          })
        }
        <button>Check Out</button>
      </div>
    )
  }
}

const mapState = ({cart}) => {
  return {cart};
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId)=> dispatch(getCart(userId)),
    removeFromCart: (book)=>dispatch(removeFromCart(book,history))
  };
};

export default connect(mapState, mapDispatch)(Cart);