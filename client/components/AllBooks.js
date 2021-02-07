import React from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../store/books";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";

export class AllBooks extends React.Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    const { books } = this.props;
    return (
      <div>
        <div>
          {books &&
            books.map((book) => {
              return (
                <div key={book.coverId}>
                  <Link to={`/books/${book.coverId}`}>
                    <img src={book.img} />
                  </Link>
                  <Link to={`/books/${book.coverId}`}>
                    <h3>{book.title}</h3>
                  </Link>
                  Author: {book.author}
                  <p>${book.price}</p>
                  <button onClick={() => this.props.addToCart(2, book)}>
                    Add to Cart
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapState = ({ books }) => {
  return { books };
};

const mapDispatch = (dispatch) => {
  return {
    getBooks: () => dispatch(fetchBooks()),
    addToCart: (userId, book) => dispatch(addToCart(userId, book)),
  };
};

export default connect(mapState, mapDispatch)(AllBooks);
