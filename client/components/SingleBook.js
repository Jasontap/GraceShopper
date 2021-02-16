import React from "react";
import { connect } from "react-redux";
import {addToCart} from '../store/cart';
import {updateBook} from '../store/books';
import Button from '@material-ui/core/Button';


export class SingleBook extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      title: this.props.book.title,
      img: this.props.book.img,
      author: this.props.book.author,
      genre: this.props.book.genre,
      description: this.props.book.genre,
      price: this.props.book.price,
      id: this.props.book.id,
      admin: this.props.admin
    }
    this.addToGuestCart = this.addToGuestCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.props.updateBook({...this.state})
  }
  
  addToGuestCart(book){
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let title = book.title;
    cart[title] = (cart[title] ? cart[title]: 0);
    let qty = cart[title] + 1;
    cart[title] = qty
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  render(){
    const { title, img, author, genre, description, price, review } = this.state;
    const { admin } = this.props;
    const { handleChange, handleSubmit } = this;
    const userId = this.props.auth.id;
    const book = this.props.book;

    return(
      <div>
        {admin ? (
          <div>
            <form onSubmit={ handleSubmit }>
              <div>
                <img src={ img } />
              </div>
              <div>
                <label htmlFor='title'>Title:
                  <input name='title' onChange={ handleChange } value={ title } size={ title.length }/>
                </label>
              </div>
              <div>
                <label htmlFor='author'>Author:
                  <input name='author' onChange={ handleChange } value={ author } size={ author.length }/>
                </label>
              </div>
              <div>
                <label htmlFor='genre'>Genre:
                  <input name='genre' onChange={ handleChange } value={ genre } size={ genre.length }/>
                </label>
              </div>
              <div>
                <label htmlFor='description'>Desctription:
                  <input name='description' onChange={ handleChange } value={ description } size={ description.length }/>
                </label>
              </div>
              <div>
                <label htmlFor='price'>$:
                  <input name='price' onChange={ handleChange } value={ price } size={ (price + '').length }/>
                </label>
              </div>
              <div>
                <button type="submit">SUBMIT</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div>
              <div>
                <img src={ img } />
              </div>
              <div>
                <p>Title: { title }</p>
              </div>
              <div>
                <p>Author: { author }</p>
              </div>
              <div>
                <p>Genre: { genre }</p>
              </div>
              <div>
                <p>Description: { description }</p>
              </div>
              {/* <div>
                <p>Reviews: { review }</p>
              </div> */}
            </div>
            <div>
              <div>
                <p>${ price }</p>
              </div>
              {
                userId ?
                  <Button 
                    onClick={()=>this.props.addToCart(userId, title)}
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
        )}
      </div>
    )
  }
}


const mapState = ({books,auth}, { match })=> {
  const book = books.find( book => book.coverId === match.params.id * 1 ) || {};
  return {
    book,
    auth,
    admin: auth.adminAuth
  };
};
  
  const mapDispatch = (dispatch) => {
    return {
      addToCart: (userId, book, qty) => dispatch(addToCart(userId, book, qty=1)),
      updateBook: (book) => dispatch(updateBook(book))
    };
  };
  
  export default connect(mapState, mapDispatch)(SingleBook);