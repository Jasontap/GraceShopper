import axios from 'axios'

//constants

const SET_BOOKS = 'SET_BOOKS';
const SET_GENRES = 'SET_GENRES';
const ADD_BOOK = 'ADD_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';
const SET_VIEW = 'SET_VIEW';

const initialState = {
  books: [],
  genres: [],
  view: '',
  count: 0
};


//action creators

export const setBooks = ({books, count = 0}) => {
  return {
    type: SET_BOOKS,
    books,
    count
  }
};

export const setGenres = (genres) => {
  return {
    type: SET_GENRES,
    genres
  }
}

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

export const fetchBooks = (genre) => {
  if(genre){
    return async (dispatch)=>{
      const books = (await axios.get(`/api/books/${genre}`)).data;
      dispatch(setBooks({books}))
    } 
  } else {
    return async (dispatch)=>{
      const books = (await axios.get('/api/books')).data;
      dispatch(setBooks({books}))
    }
  }
};

export const pagingBooks = (idx) => {
  return async (dispatch)=>{
    const { books, count } = (await axios.get(`/api/books/page?idx=${idx}`)).data;
    dispatch(setBooks({books, count}))
  }
};

export const fetchGenres = () => {
  return async (dispatch) =>{
    const books = (await axios.get('/api/books')).data;
    const genres = books.map(book => book.genre);
    const uniqueGenres = [...new Set(genres)];
    dispatch(setGenres(uniqueGenres));
  }
}

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

export default function booksReducer(state=initialState, action) {
  if(action.type === SET_BOOKS){
    state = {...state, books: action.books, count: action.count }
  }
  if(action.type === SET_GENRES){
    state = {...state, genres: action.genres }
  }
  if(action.type === ADD_BOOK){
    state = {...state, books: [...state.books, action.book] };
  }
  if(action.type === DELETE_BOOK){
    state = {...state, books: state.books.filter(book => book.id !== action.book.id) };
  }
  if(action.type === UPDATE_BOOK){
    state = {...state, books: state.books.map(book => action.book.id === book.id ? action.book : book) };
  }
  if(action.type === SET_VIEW){
    state = {...state, view: action.view };
  }

  return state;
}