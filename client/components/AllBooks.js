import React from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../store/books";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";
import Button from '@material-ui/core/Button';
import auth from "../store/auth";

export class AllBooks extends React.Component {
  constructor(props){
    super(props)
    this.addToGuestCart = this.addToGuestCart.bind(this)
  }
  componentDidMount() {
    this.props.getBooks();
    localStorage.clear();
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


  
  render() {
    const { books } = this.props;
    const userId = this.props.auth.id;
    return (
      <div>
        <div className="container">
          {books &&
            books.map((book) => {
              return (
                <div className="book-card" key={book.coverId}>
                  <Link to={`/books/${book.coverId}`}>
                    <img className="cover-art" src={book.img} />
                  </Link>
                  <Link to={`/books/${book.coverId}`}>
                    <h3>{book.title}</h3>
                  </Link>
                  Author: {book.author}
                  <p>${book.price}</p>
                  {
                    userId ?
                    <Button onClick={() => this.props.addToCart(userId, book)}>
                    Add to Cart
                    </Button>
                  :
                    <Button onClick={()=>this.addToGuestCart(book)}>not yet hooked up: Add to guest cart</Button>
                  }
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapState = ({ books, auth }) => {

  return { books, auth};
};

const mapDispatch = (dispatch) => {
  return {
    getBooks: () => dispatch(fetchBooks()),
    addToCart: (userId, book) => dispatch(addToCart(userId, book)),
  };
};

export default connect(mapState, mapDispatch)(AllBooks);
