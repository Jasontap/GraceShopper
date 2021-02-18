import React from "react"
import { connect } from "react-redux"
import { getCart, removeFromCart, updateCart } from '../store/cart'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom";

export class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cart: [],
      total: 0,
      tempQty: 0
    }
    this.removeFromGuestCart = this.removeFromGuestCart.bind(this)
    this.updateGuestCart = this.updateGuestCart.bind(this)
  }
  componentDidUpdate(prevProps){
    if(prevProps.usercart.length !== this.props.usercart.length){
      const userId = this.props.auth.id;
      let cart;
      let total;
      if(userId){
        cart = this.props.usercart
        total = cart.reduce((accum,item)=>{
          accum+=(item.price * item.quantity)
          return accum;
        },0)
      }else{
        cart = [];
        const localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        for(let key in localcart){
          cart.push({book: key, quantity: localcart[key]})
        }
      }
      this.setState({cart, total})
    }
  }
  componentDidMount(){
    const userId = this.props.auth.id;
    let cart;
    let total;
    if(userId){
      cart = this.props.usercart
      total = cart.reduce((accum,item)=>{
        accum+=(item.price * item.quantity)
        return accum;
      },0)
    }else{
      cart = [];
      const localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
      for(let key in localcart){
        cart.push({book: key, quantity: localcart[key]})
      }
    }
    this.setState({cart, total})
  }

  removeFromGuestCart(book){
    const title=book.book;
    let localcart = JSON.parse(localStorage.getItem('cart'));
    delete localcart[title]
    localStorage.setItem('cart', JSON.stringify(localcart));
    let cart = [];
    for(let key in localcart){
      cart.push({book: key, quantity: localcart[key]})
    }
    this.setState({cart})
  }

  updateGuestCart(book,qty){
    if(qty===0){
      this.removeFromGuestCart(book)
      return
    }
    let localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let title = book.book;
    localcart[title] = qty
    localStorage.setItem('cart', JSON.stringify(localcart));
    let cart = [];
    for(let key in localcart){
      cart.push({book: key, quantity: localcart[key]})
    }
    this.setState({cart})
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
          <div className="cart-card"><p>Your cart is Empty. <a href='/allbooks'>Shop?</a></p></div>
          :
          cart.map(item => {
            return(
              <div key={item.book} className="cart-card">
                <h4>{item.book}</h4>
                {
                  userId?
                  <div>
                    <form className="qty-adjust">
                      <input className="qty-input" type="number" min="0" step="1" defaultValue={item.quantity} id="qty-input-user"></input>
                      <Button onClick={()=>this.props.updateCart(userId,item,document.getElementById("qty-input-user").value*1)}>Update</Button>
                    </form>
                    <Button onClick={()=>this.props.removeFromCart(userId,item)}>Remove from Cart</Button>
                  </div>
                  :
                  <div>
                    <form className="qty-adjust">
                      <input className="qty-input" type="number" min="0" step="1" defaultValue={item.quantity} id="qty-input-nonuser"></input>
                      <Button onClick={()=>this.updateGuestCart(item, document.getElementById("qty-input-nonuser").value*1)}>Update</Button>
                    </form>
                    <Button onClick={()=>this.removeFromGuestCart(item)}>Remove from Cart</Button>
                  </div>
                }
              </div>
            )
          })
        }


        <h4>Total: ${this.state.total}</h4>
        <Link to='/checkout'><Button disabled={!this.state.cart.length || !userId}>Check Out</Button></Link>
        {
          userId? '' :
          <div id="guest-options">
            <p>You are not logged in.</p>
            {
              this.state.cart.length?
              <Link to='/checkout'><Button>Check Out As Guest</Button></Link> : ''
            }
            <Link to='/login'><Button>Login</Button></Link>
            <Link to='/signup'><Button>Sign-Up</Button></Link>
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

const mapDispatch = (dispatch, {history}) => {
  return {
    getCart: (userId)=> dispatch(getCart(userId)),
    removeFromCart: (userId, book)=>dispatch(removeFromCart(userId,book, history)),
    updateCart: (userId, book, qty)=>dispatch(updateCart(userId, book, qty, history))
  };
};

export default connect(mapState, mapDispatch)(Cart);