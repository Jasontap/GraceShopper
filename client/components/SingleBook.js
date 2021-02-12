import React from "react"
import { connect } from "react-redux"
import {addToCart} from '../store/cart'
import Button from '@material-ui/core/Button';


export class SingleBook extends React.Component{
  constructor(props){
    super(props)
    this.addToGuestCart = this.addToGuestCart.bind(this)
  }
  addToGuestCart(book){
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let title = book.title;
    cart[title] = (cart[title] ? cart[title]: 0);
    let qty = cart[title] + 1;
    cart[title] = qty
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  render(){
    const { book } = this.props;
    const userId = this.props.auth.id;
    return(
      <div>
        <div>
          <div>
            <img src={ book.img } />
          </div>
          <div>
            <p>Title: { book.title }</p>
          </div>
          <div>
            <p>Author: { book.author }</p>
          </div>
          <div>
            <p>Genre: { book.genre }</p>
          </div>
          <div>
            <p>Description: { book.description }</p>
          </div>
          <div>
            <p>Reviews: { book.review }</p>
          </div>
        </div>
        <div>
          <div>
            <p>${ book.price }</p>
          </div>
          {
            userId?
          <Button 
            onClick={()=>this.props.addToCart(userId, book)}
            >Add to Cart
          </Button>
          :
          <Button 
            onClick={()=>this.addToGuestCart(book)}
            >Add to Guest Cart
        </Button>

          }
        </div>
    </div>
    )
  }
}

const mapState = ({books,auth}, { match })=> {
  const book = books.find( book => book.coverId === match.params.id * 1 ) || {};
  return {
    book,
    auth
  };
};
  
  const mapDispatch = (dispatch) => {
    return {
      addToCart: (userId, book) => dispatch(addToCart(userId, book)),
    };
  };
  
  export default connect(mapState, mapDispatch)(SingleBook);