import axios from 'axios'

//constants

const SET_BOOKS = 'SET_BOOKS'
const ADD_BOOK = 'ADD_BOOK'
const DELETE_BOOK = 'DELETE_BOOK'
const UPDATE_BOOK = 'UPDATE_BOOK'


//action creators

export const setBooks = (books) => {
  return {
    type: SET_BOOKS,
    books
  }
};

export const _addBook = (book) => {
  return {
    type: ADD_BOOK,
    book
  }
};

export const _deleteBook = (book) => {
  return {
    type: DELETE_BOOK,
    book
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
    const books = (await axios.get('/api/books')).data;
    dispatch(setBooks(books))
  }
};

export const addBook = (book) => {
  return async (dispatch) => {
    const newBook = (await axios.post('/api/books', book)).data;
    dispatch(_addBook(newBook));
  }
}

export const destroyBook = (book) => {
  return async (dispatch)=>{
    await axios.delete(`/api/books/${book.id}`, book);
    dispatch(_deleteBook(book))
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
  if(action.type === ADD_BOOK){
    return [...state, action.book];
  }
  if(action.type === DELETE_BOOK){
    return state.filter(book => book.id !== action.book.id)
  }
  if(action.type === UPDATE_BOOK){
    return state.map(book => action.book.id === book.id ? action.book : book)
  }

  return state;
}