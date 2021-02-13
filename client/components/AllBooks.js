import React from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../store/books";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";
import { destroyBook } from "../store/books";

export class AllBooks extends React.Component {
  componentDidMount() {
    this.props.getBooks();
  }
  
  render() {
    const { books, addToCart } = this.props;
    const userId = this.props.auth.id;
    const admin = this.props.auth.adminAuth;
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
                  {admin ? (
                    <div>
                      <Link to={`/books/${book.coverId}`}><button>Edit Item</button></Link>
<<<<<<< HEAD
                      <button onClick={ ()=> {this.props.destroyBook(book)}}>Delete Item From Database</button>
=======
                      <button>Delete item</button>
>>>>>>> 3c168ec... Setup view/option switch per admin authorization
                    </div>

                  ) : (
                    <button onClick={() => addToCart(userId, book)}>
                      Add to Cart
                    </button>
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
  return { books, auth };
};

const mapDispatch = (dispatch) => {
  return {
    getBooks: () => dispatch(fetchBooks()),
    addToCart: (userId, book) => dispatch(addToCart(userId, book)),
    destroyBook: (book) => dispatch(destroyBook(book))
  };
};

export default connect(mapState, mapDispatch)(AllBooks);
