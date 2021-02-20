import React from "react"
import { connect } from "react-redux"
import { addBook } from '../store/books'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


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
      <div className='single-item-container'>
        {!admin ? ( <Redirect to="/home" /> ) : (
          <form onSubmit={ handleSubmit } className='singleInfoBox'>
            <div>
              <img src={ img } />
            </div>
            <div className='singleInfo'>
              <div className='bookStuff'>
                <label htmlFor='title'><h1>Title: </h1></label>
                <input name='title' onChange={ handleChange } value={ title } />
              </div>
              <div className='bookStuff'>
                <label htmlFor='author'><h3>Author: </h3></label>
                <input name='author' onChange={ handleChange } value={ author } />
              </div>
              <div className='bookStuff'>
                <label htmlFor='genre'><h3>Genre: </h3></label>
                <input name='genre' onChange={ handleChange } value={ genre } />
              </div>
              <div className='bookStuff'>
                <label htmlFor='description'><h3>Desctription: </h3></label>
                <input name='description' onChange={ handleChange } value={ description } />
              </div>
              <div className='bookStuff'>
                <label htmlFor='price'><h3>Price: </h3></label>
                <input name='price' onChange={ handleChange } value={ price } />
              </div>
              <div className='bookStuff'>
                <label>Cover ID: </label>
                <input name='coverId' onChange={ handleChange } value={ coverId } />
              </div>
              <div className='container'>
                <div className='close-buttons'>
                  <Button type="submit">Save</Button>
                </div>
                <div className='close-buttons'>
                  <Button><Link to='/allbooks'>Return to Books</Link></Button>
                </div>
              </div>
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