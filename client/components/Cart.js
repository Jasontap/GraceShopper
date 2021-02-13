import React from "react"
import { connect } from "react-redux"
import { getCart, removeFromCart } from '../store/cart'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom";

export class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cart: [],
      total: 0
    }
    this.removeFromGuestCart = this.removeFromGuestCart.bind(this)
  }
  componentDidMount(){
    const userId = this.props.auth.id;
    let cart;
    if(userId){
      cart = this.props.usercart
    }else{
      cart = [];
      const localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
      for(let key in localcart){
        cart.push({book: key, quantity: localcart[key]})
      }
    }
    this.setState({cart})
  }

  removeFromGuestCart(book){
    console.log(book)
    console.log(this.state.cart)
    let items = this.state.cart.filter((item) => item.book !== book.book);
    let cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[book.title];
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({cart: items})
  }

  clearCart(){
    localStorage.removeItem('cart');
    this.setState({cart: []});
  }

  render(){
    const cart = this.state.cart
    const userId = this.props.auth.id
    return(
      <div>
        <h1>CART</h1>
        {
          cart.length === 0?
          <div className="cart-card"><p>Your cart is Empty. <a href='/allbooks'>Shop?</a></p></div> :
          cart.map(item => {
            return(
              <div key={item.book} className="cart-card">
                <h4>{item.book}</h4>
                <p>Quantity: {item.quantity}</p>
                {/* <p>Cost: {item.quantity * item.price}</p> */}
                {
                  userId? 
                  <Button onClick={()=>this.props.removeFromCart(item)}>Remove from Cart</Button>
                  :
                  <Button onClick={()=>this.removeFromGuestCart(item)}>Remove from Cart</Button>
                }
              </div>
            )
          })
        }
        <h4>Total: {this.state.total}</h4>
        <Link to='/checkout'><Button disabled={!this.state.cart.length || !userId}>Check Out</Button></Link>
        {
          userId? '' :
          <div id="guest-options">
            <p>You are not logged in.</p>
            {
              this.state.cart.length?
              <Link to='/checkout'><p>Check Out As Guest</p></Link> : ''
            }
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