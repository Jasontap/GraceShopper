import React from "react"
import { connect } from "react-redux"
import {addToCart} from '../store/cart'
import {updateBook} from '../store/books'


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
      admin: this.props
    }
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

  render(){
    const { title, img, author, genre, description, price, admin } = this.state;
    const { handleChange, handleSubmit } = this;
    return(
      <div>
        {admin ? (
          <div>
            <form onSubmit={ handleSubmit }>
              <div>
                <img src={ img } />
              </div>
              <div>
<<<<<<< HEAD
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
=======
                <label htmlFor='title'>Title:</label>
                <input name='title' onChange={ handleChange } defaultValue={ title } size='50'/>
              </div>
              <div>
                <label htmlFor='author'>Author:</label>
                <input name='author' onChange={ handleChange } defaultValue={ author } size='50'/>
              </div>
              <div>
                <label htmlFor='genre'>Genre:</label>
                <input name='genre' onChange={ handleChange } defaultValue={ genre } size='50'/>
              </div>
              <div>
                <label htmlFor='description'>Desctription:</label>
                <input name='description' onChange={ handleChange } defaultValue={ description } size='50'/>
              </div>
              <div>
                <label htmlFor='price'>$:</label>
                <input name='price' onChange={ handleChange } value={ price } />
>>>>>>> 4e57765... Setup UPDATE_BOOK for admin only
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
              <button 
                // onClick={()=>this.props.addToCart(userId, book)}
                >Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state, { match })=> {
  console.log(state)
  const book = state.books.find( book => book.coverId === match.params.id * 1 ) || {};
  return {
    book,
    admin: state.auth.adminAuth
  };
};
  
  const mapDispatch = (dispatch) => {
    return {
      addToCart: (userId, book) => dispatch(addToCart(userId, book)),
      updateBook: (book) => dispatch(updateBook(book))
    };
  };
  
  export default connect(mapState, mapDispatch)(SingleBook);