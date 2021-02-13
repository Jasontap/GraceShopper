import axios from 'axios'

//constants

const SET_BOOKS = 'SET_BOOKS'
// const ADD_CART = 'ADD_CART'
<<<<<<< HEAD
const ADD_BOOK = 'ADD_BOOK'
const DELETE_BOOK = 'DELETE_BOOK'
=======
>>>>>>> 4e57765... Setup UPDATE_BOOK for admin only
const UPDATE_BOOK = 'UPDATE_BOOK'
const DELETE_BOOK = 'DELETE_BOOK'


//action creators

export const setBooks = (books) => {
  return {
    type: SET_BOOKS,
    books
  }
};

<<<<<<< HEAD
<<<<<<< HEAD
export const _addBook = (book) => {
  return {
    type: ADD_BOOK,
    book
  }
};

=======
>>>>>>> 379f552... Admin can Delete books from database
export const _deleteBook = (book) => {
  return {
    type: DELETE_BOOK,
    book
  }
};

<<<<<<< HEAD
=======
>>>>>>> 4e57765... Setup UPDATE_BOOK for admin only
=======
>>>>>>> 379f552... Admin can Delete books from database
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

<<<<<<< HEAD
<<<<<<< HEAD
export const addBook = (book) => {
  return async (dispatch) => {
    const newBook = (await axios.post('/api/books', book)).data;
    dispatch(_addBook(newBook));
  }
}
=======
>>>>>>> 379f552... Admin can Delete books from database
export const destroyBook = (book) => {
  return async (dispatch)=>{
    await axios.delete(`/api/books/${book.id}`, book);
    dispatch(_deleteBook(book))
  }
};

<<<<<<< HEAD
=======
>>>>>>> 4e57765... Setup UPDATE_BOOK for admin only
=======
>>>>>>> 379f552... Admin can Delete books from database
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
<<<<<<< HEAD
<<<<<<< HEAD
  if(action.type === ADD_BOOK){
    return [...state, action.book];
  }
  if(action.type === DELETE_BOOK){
    return state.filter(book => book.id !== action.book.id)
  }
=======
>>>>>>> 4e57765... Setup UPDATE_BOOK for admin only
=======
  if(action.type === DELETE_BOOK){
    return state.filter(book => book.id !== action.book.id)
  }
>>>>>>> 379f552... Admin can Delete books from database
  if(action.type === UPDATE_BOOK){
    return state.map(book => action.book.id === book.id ? action.book : book)
  }

  return state;
}