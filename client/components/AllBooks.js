import React from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../store/books";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";
import Button from '@material-ui/core/Button';
import auth from "../store/auth";

export class AllBooks extends React.Component {
  componentDidMount() {
    this.props.getBooks();
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
                    <Button>not yet hooked up: Add to guest cart</Button>
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
  return { books, auth };
};

const mapDispatch = (dispatch) => {
  return {
    getBooks: () => dispatch(fetchBooks()),
    addToCart: (userId, book) => dispatch(addToCart(userId, book)),
  };
};

export default connect(mapState, mapDispatch)(AllBooks);
