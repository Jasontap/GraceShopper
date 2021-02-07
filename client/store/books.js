import axios from 'axios'

//constants

const SET_BOOKS = 'SET_BOOKS'
// const ADD_CART = 'ADD_CART'


//action creators

export const setBooks = (books) => {
    return {
      type: SET_BOOKS,
      books
    }
  };


//thunks

export const fetchBooks = () => {
    return async (dispatch)=>{
      const books = (await axios.get('http://openlibrary.org/subjects/love.json?subject=love')).data
      console.log(books)
      dispatch(setBooks(books))
    }
  };


//reducer

export default function booksReducer(state=[], action) {
    if(action.type === SET_BOOKS){
      state = action.books
    }
  
    return state;
  }