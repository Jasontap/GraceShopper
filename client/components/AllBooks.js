import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, destroyBook } from "../store/books";
import { addToCart } from "../store/cart";
import Button from '@material-ui/core/Button';
import {auth} from "../store/auth";
import Alert from 'react-bootstrap/Alert'

export class AllBooks extends React.Component {
  constructor(props){
    super(props)
    this.addToGuestCart = this.addToGuestCart.bind(this)
  }
  componentDidMount() {
    const userId = this.props.auth.id;
    this.props.getBooks();
    const localcart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    if(localcart){
      for(let key in localcart){
        this.props.addToCart(userId, key, localcart[key])
      }
    }
    localStorage.clear();
  }

  addToGuestCart(book){
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let title = book.title;
    let price = book.price;
    cart[title] = (cart[title] ? cart[title]: 0);
    let qty = cart[title] + 1;
    cart[title] = qty
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  
  render() {
    const { books, view, addToCart, destroyBook } = this.props;
    const userId = this.props.auth.id;
    const admin = this.props.auth.adminAuth;

    return (
      <div>
        <div className="container">
          {books &&
            books.map((book) => {
              return (
                <div className="book-card" key={book.id}>
                  <Link to={`/allbooks/${book.coverId}`}>
                    <img className="cover-art" src={book.img} />
                  </Link>
                  <Link to={`/allbooks/${book.coverId}`}>
                    <h3 className="book-title-div">{book.title}</h3>
                  </Link>
                  <p>${book.price}</p>
                  {admin ? (
                    <div>
                      <Link to={`/allbooks/${book.coverId}`}><button>Edit Item</button></Link>
                      <button onClick={ ()=> {destroyBook(book)}}>Delete Item From Database</button>
                    </div>
                  ) : (
                  <div>
                  {
                    userId ? (
                      <div>
                    {/* <Alert variant="success" dismissable="true" fade="true">
                      <strong>Holy guacamole!</strong>
                    </Alert> */}
                    <Button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => this.props.addToCart(userId, book.title, book.price)}>
                    Add to Cart
                    </Button>
                    </div>
                    )
                  : (
                    <Button onClick={()=>this.addToGuestCart(book)}>Add to Guest Cart</Button>
                  )
                  }
                  </div>

                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapState = ({ books, auth }) => {
  return { 
    books: books.books,
    view: books.view,
    auth 
  };
};

const mapDispatch = (dispatch) => {
  return {
    getBooks: () => dispatch(fetchBooks()),
    addToCart: (userId, book, price, qty) => dispatch(addToCart(userId, book, price, qty=1)),
    destroyBook: (book) => dispatch(destroyBook(book))
  };
};

export default connect(mapState, mapDispatch)(AllBooks);
