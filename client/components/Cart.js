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
    // this.stackCart = this.stackCart.bind(this)
  }
  // stackCart(localcart){
  //   let cart = []
  //   let total = 0
  //   for(let key in localcart){
  //     cart.push({book: key, quantity: localcart[key].quantity, price: localcart[key].price})
  //     total += localcart[key].quantity * localcart[key].price;
  //   }
  //   return {cart,total}
  // }
  componentDidMount(){
    const userId = this.props.auth.id;
    let cart;
    let total=0;
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
        cart.push({book: key, quantity: localcart[key].quantity, price: localcart[key].price})
        total += localcart[key].quantity * localcart[key].price;
      }
    }
    this.setState({cart, total})
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.usercart.length !== this.props.usercart.length || prevState.total !== this.state.total){
      const userId = this.props.auth.id;
      let cart;
      let total=0;
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
          cart.push({book: key, quantity: localcart[key].quantity, price: localcart[key].price})
          total += localcart[key].quantity * localcart[key].price;
        }
      }
      this.setState({cart, total})
    }
  }
  removeFromGuestCart(book){
    const title=book.book;
    let localcart = JSON.parse(localStorage.getItem('cart'));
    delete localcart[title]
    localStorage.setItem('cart', JSON.stringify(localcart));
    let cart = [];
    for(let key in localcart){
      cart.push({book: key, quantity: localcart[key].quantity, price: localcart[key].price})
    }
    const total = this.state.total - book.price
    this.setState({cart, total})
  }
  updateGuestCart(book,qty){
    if(qty===0){
      this.removeFromGuestCart(book)
      return
    }
    let localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let title = book.book;
    localcart[title].quantity = qty
    localStorage.setItem('cart', JSON.stringify(localcart));
    let cart = [];
    let total = 0;
    for(let key in localcart){
      cart.push({book: key, quantity: localcart[key].quantity, price: localcart[key].price})
      total += localcart[key].quantity * localcart[key].price;
    }
    this.setState({cart,total})
  }
  clearCart(){
    localStorage.removeItem('cart');
    this.setState({cart: [], total: 0});
  }
  render(){
    const cart = this.state.cart
    const userId = this.props.auth.id
    return(
      <div id='cartBox'>
        <h1>CART</h1>
        {
          cart.length === 0?
          <div className="cart-card"><p>Your cart is Empty. <a href='/allbooks'>Shop?</a></p></div>
          :
          cart.map(item => {
            console.log(item)
            return(
              <div key={item.book} className="cart-card">
                <h4 className='bookName'>{item.book}</h4>
                {
                  userId?
                  <div className='cartOptions'>
                    <form className="qty-adjust">
                      <input className="qty-input" type="number" min="0" step="1" defaultValue={item.quantity} id="qty-input-user"></input>
                      <Button onClick={()=>this.props.updateCart(userId,item,document.getElementById("qty-input-user").value*1)}>Update</Button>
                    </form>
                    <Button className='removeButt' onClick={()=>this.props.removeFromCart(userId,item)}>Remove from Cart</Button>
                  </div>
                  :
                  <div className='cartOptions'>
                    <form className="qty-adjust">
                      <input className="qty-input" type="number" min="0" step="1" defaultValue={item.quantity} id="qty-input-nonuser"></input>
                      <Button onClick={()=>this.updateGuestCart(item, document.getElementById("qty-input-nonuser").value*1)}>Update</Button>
                    </form>
                    <Button className='removeButt' onClick={()=>this.removeFromGuestCart(item)}>Remove from Cart</Button>
                  </div>
                }
              </div>
            )
          })
        }
        <div id='orderTotal'>
          <h4 className='cartBottom checkButt'>Total: ${this.state.total}</h4>
          <Link to='/checkout'><Button  disabled={!this.state.cart.length || !userId}>Check Out</Button></Link>
        </div>
        {
          userId? '' :
          <div id="guest-options">
            <p className='cartBottom'>You are not logged in.</p>
            {
              this.state.cart.length?
              <Link to='/checkout'><Button>Check Out As Guest</Button></Link> : ''
            }
            <div id='guestButtons'>
              <Link to='/login'><Button className='cartBottom'>Login</Button></Link>
              <Link to='/signup'><Button className='cartBottom'>Sign-Up</Button></Link>
            </div>
          </div>
          }
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
    removeFromCart: (userId, book)=>dispatch(removeFromCart(userId,book, history)),
    updateCart: (userId, book, qty)=>dispatch(updateCart(userId, book, qty, history))
  };
};
export default connect(mapState, mapDispatch)(Cart);