import axios from 'axios'

//constants

const SET_BOOKS = 'SET_BOOKS'
// const ADD_CART = 'ADD_CART'
const UPDATE_BOOK = 'UPDATE_BOOK'


//action creators

export const setBooks = (books) => {
  return {
    type: SET_BOOKS,
    books
  }
};

export const _updateBook = (book) => {
  return {
    type: UPDATE_BOOK,
    book
  }
};


//thunks

export const fetchBooks = () => {
  return async (dispatch)=>{
    const books = (await axios.get('/api/books/')).data;
    dispatch(setBooks(books))
  }
};

export const updateBook = (book) => {
  return async (dispatch)=>{
    const updated = (await axios.put(`/api/books/${book.id}`, book)).data;
    dispatch(_updateBook(updated))
  }
};



//reducer

export default function booksReducer(state=[], action) {
  if(action.type === SET_BOOKS){
    state = action.books
  }
  if(action.type === UPDATE_BOOK){
    return state.map(book => action.book.id === book.id ? action.book : book)
  }

  return state;
}