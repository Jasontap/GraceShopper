import React from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../store/books";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";
import { destroyBook } from "../store/books";
import Button from '@material-ui/core/Button';

export class AllBooks extends React.Component {
  constructor(props){
    super(props)
    this.addToGuestCart = this.addToGuestCart.bind(this)
  }
  componentDidMount() {
    this.props.getBooks('love');
    localStorage.clear();
  }

  addToGuestCart(book){
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let title = book.title;
    cart[title] = (cart[title] ? cart[title]: 0);
    let qty = cart[title] + 1;
    cart[title] = qty
    localStorage.setItem('cart', JSON.stringify(cart));
  }


  
  render() {
    const { books, addToCart } = this.props;
    const userId = this.props.auth.id;
    const admin = this.props.auth.adminAuth;
    return (
      <div>
        <div className="container">
          {books &&
            books.map((book) => {
              return (
                <div className="book-card" key={book.id}>
                  <Link to={`/books/${book.coverId}`}>
                    <img className="cover-art" src={book.img} />
                  </Link>
                  <Link to={`/books/${book.coverId}`}>
                    <h3 className="book-title-div">{book.title}</h3>
                  </Link>
                  <p>${book.price}</p>
                  {admin ? (
                    <div>
                      <Link to={`/books/${book.coverId}`}><button>Edit Item</button></Link>
                      <button onClick={ ()=> {this.props.destroyBook(book)}}>Delete Item From Database</button>
                    </div>
                  ) : (
                  <div>
                  {
                    userId ?
                    <Button onClick={() => this.props.addToCart(userId, book)}>
                    Add to Cart
                    </Button>
                  :
                    <Button onClick={()=>this.addToGuestCart(book)}>Add to Guest Cart</Button>
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
    books, 
    auth 
  };
};

const mapDispatch = (dispatch) => {
  return {
    getBooks: (genre) => dispatch(fetchBooks(genre)),
    addToCart: (userId, book) => dispatch(addToCart(userId, book)),
    destroyBook: (book) => dispatch(destroyBook(book))
  };
};

export default connect(mapState, mapDispatch)(AllBooks);
