import React from "react"
import { connect } from "react-redux"
import { addBook } from '../store/books'
import { Redirect } from 'react-router-dom'


export class AddBook extends React.Component{
  constructor () {
    super();
    this.state = {
      title: '',
      author: '',
      genre: '',
      description: '',
      price: 0,
      coverId: 0
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
    this.props.addBook({...this.state})
  }

  render(){
    const { title, img, author, genre, description, price, coverId } = this.state;
    const { admin } = this.props;
    const { handleChange, handleSubmit } = this;
    return(
      <div>
        {!admin ? ( <Redirect to="/home" /> ) : (
          <form onSubmit={ handleSubmit }>
            <div>
              <img src={ img } />
            </div>
            <div>
              <label>Title:</label>
              <input name='title' onChange={ handleChange } value={ title } />
            </div>
            <div>
              <label>Author:</label>
              <input name='author' onChange={ handleChange } value={ author } />
            </div>
            <div>
              <label>Genre:</label>
              <input name='genre' onChange={ handleChange } value={ genre } />
            </div>
            <div>
              <label>Desctription:</label>
              <input name='description' onChange={ handleChange } value={ description } />
            </div>
            <div>
              <label>$:</label>
              <input name='price' onChange={ handleChange } value={ price } />
            </div>
            <div>
              <label>Cover ID:</label>
              <input name='coverId' onChange={ handleChange } value={ coverId } />
            </div>
            <div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

const mapState = (state)=> {
  return {
    admin: state.auth.adminAuth
  };
};
  
  const mapDispatch = (dispatch) => {
    return {
      addBook: (book) => dispatch(addBook(book))
    };
  };
  
  export default connect(mapState, mapDispatch)(AddBook);