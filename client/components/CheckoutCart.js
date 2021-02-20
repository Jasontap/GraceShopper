import React from "react"
import { connect } from "react-redux"
import { getCart, removeFromCart, updateCart } from '../store/cart'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom";


export class CheckoutCart extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cart: [],
      total: 0,
      tempQty: 0
    }
    // this.removeFromGuestCart = this.removeFromGuestCart.bind(this)
    // this.updateGuestCart = this.updateGuestCart.bind(this)
  }
  componentDidMount(){
    let cart;
    let total=0;
    if(this.props.auth){
      cart = this.props.usercart
      total = cart.reduce((accum,item)=>{
        accum+=(item.price * item.quantity)
        return accum;
      },0)
    }else{
      cart = [];
      const localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
      for(let key in localcart){
        cart.push({book: key, quantity: localcart[key].quantity, price: localcart[key].price})
        total += localcart[key].quantity * localcart[key].price;
      }
    }
    this.setState({cart, total})
  }

  render(){
    const cart = this.state.cart
    // const userId = this.props.auth.id || ''
    return(
      <div id='cartBox'>
        <h1>Order Summary</h1>
        {
          cart.length === 0?
          <div className="cart-card"><p>Your cart is Empty. <a href='/allbooks'>Shop?</a></p></div>
          :
          cart.map(item => {
            return(
              <div key={item.book} className="cart-card">
                <h4 className='bookName'>{item.book}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            )
          })
        }
        <div id='orderTotal'>
          <h4 className='cartBottom checkButt'>Total: ${this.state.total}</h4>
        </div>
      </div>
    )
  }
}
const mapState = ({cart,auth}) => {
  const usercart = cart.filter(line=>line.userId === auth.id && line.orderId === null)
  return {usercart, auth};
};
const mapDispatch = (dispatch, {history}) => {
  return {
    getCart: (userId)=> dispatch(getCart(userId)),
  };
};
export default connect(mapState, mapDispatch)(CheckoutCart);